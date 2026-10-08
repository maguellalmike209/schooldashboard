import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { scenario, checkpoint, markDone } from './review-fixtures.mjs';
import { inspectState, taskDigest, validateGrant, validateCheckpoint, acquireFixtureLock, parseTasks } from '../../scripts/icm-automation/core.mjs';
import { renderReport } from '../../scripts/icm-automation/report.mjs';

function select(s) { return inspectState(s); }
function clone(v) { return structuredClone(v); }

test('no grant is reportable, not executable', () => { const s = scenario(); s.grant = null; assert.equal(select(s).state, 'NO AUTHORIZED WORK'); });
test('20 approved tasks select only first eligible task', () => { const s = scenario(); assert.equal(s.grant.taskIds.length, 20); assert.deepEqual(select(s), { state: 'SELECT', reason: 'Next eligible authorized task SD-100', taskId: 'SD-100', nextStage: 'Plan' }); });
test('silent daily review does not change a valid grant', () => { const s = scenario(); assert.deepEqual(select(s), select(s)); });
test('new unapproved registry task does not enter grant', () => { const s = scenario(); s.tasks.push({ ...clone(s.tasks[0]), id: 'SD-999', accepted: true }); assert.equal(select(s).taskId, 'SD-100'); });
test('changed authorized definition is rejected', () => { const s = scenario(); s.tasks[0].scope = 'Other work'; assert.match(select(s).reason, /changed after authorization/); });
test('status change alone does not alter bound task definition', () => { const s = scenario(); const d = taskDigest(s.tasks[0]); s.tasks[0].status = 'In progress'; assert.equal(taskDigest(s.tasks[0]), d); });
test('recovery precedes new task selection', () => { const s = scenario(); for(let i=0;i<8;i++)markDone(s,i); s.tasks[8].status='In progress'; s.evidence['SD-108']={plan:true}; s.checkpoint=checkpoint(s,8); s.repo.dirty=true; assert.deepEqual([select(s).state,select(s).taskId,select(s).nextStage],['RECOVER','SD-108','Build']); });
test('completed dependency needs independent integration evidence', () => { const s = scenario(); s.tasks[0].status='Done'; assert.equal(select(s).state,'STOP'); });
test('after integrated proof selector advances', () => { const s = scenario(); markDone(s,0); assert.equal(select(s).taskId,'SD-101'); });
test('failed CI cannot mark task complete', () => { const s = scenario(); s.tasks[0].status='Ready for verification'; s.evidence['SD-100']={plan:true,build:true,verify:'PASS',ci:'FAIL',head:s.repo.head}; assert.equal(select(s).state,'INTEGRATION BLOCKED'); });
test('Verify PASS with pending PR is explicitly pending', () => { const s = scenario(); s.tasks[0].status='Ready for verification'; s.evidence['SD-100']={plan:true,build:true,verify:'PASS',ci:'PENDING',head:s.repo.head}; assert.equal(select(s).state,'INTEGRATION PENDING'); });
test('stale verification head is rejected', () => { const s = scenario(); s.tasks[0].status='Ready for verification'; s.evidence['SD-100']={build:true,verify:'PASS',ci:'PASS',head:'b'.repeat(40)}; assert.match(select(s).reason,/Stale Verify/); });
test('dirty checkout without checkpoint cannot be resumed', () => { const s = scenario(); s.repo.dirty=true; assert.equal(select(s).state,'STOP'); });
test('offline or unavailable canonical remote stops any write-selection advice', () => { const s = scenario(); s.repo.remoteStatus='UNKNOWN'; assert.equal(select(s).state,'STOP'); });
test('expired authorization stops', () => { const s = scenario(); s.now='2026-10-16T00:00:00.000Z'; assert.equal(select(s).state,'STOP'); });
test('paused and revoked authorizations stop', () => { for (const f of ['paused','revoked']) { const s=scenario(); s.grant[f]=true; assert.equal(select(s).state,'STOP'); }});
test('scope may not silently escalate beyond risk ceiling', () => { const s=scenario(); s.tasks[0].risk='R3'; s.grant.taskDigests['SD-100']=taskDigest(s.tasks[0]); assert.match(select(s).reason,/exceeds grant/); });
test('unknown or forged grant fields fail closed', () => { const s=scenario(); s.grant.allowAll=true; assert.equal(select(s).state,'STOP'); });
test('zero retries is a valid intentional policy', () => { const s=scenario(); s.grant.budgets.maxRetries=0; assert.doesNotThrow(()=>validateGrant(s.grant)); assert.equal(select(s).state,'SELECT'); });
test('exhausted retries stop without widening work', () => { const s=scenario(); s.usage.retries=4; assert.equal(select(s).state,'STOP'); });
test('retry budget stops at the exact positive limit', () => { const s=scenario(); s.usage.retries=3; assert.equal(select(s).state,'STOP'); });
test('invalid invocation time fails closed', () => { const s=scenario(); s.now='bad-time'; assert.equal(select(s).state,'STOP'); });
test('contradictory integrated checkpoint cannot resume Build', () => { const s=scenario(); s.tasks[0].status='In progress'; s.checkpoint=checkpoint(s,0); s.checkpoint.result='integrated'; s.evidence['SD-100']={plan:true}; assert.equal(select(s).state,'STOP'); });
test('checkpoint cannot restart a not-started task at Plan', () => { const s=scenario(); s.checkpoint=checkpoint(s,0); s.evidence['SD-100']={plan:true}; assert.equal(select(s).state,'STOP'); });
test('bare completion flags cannot unlock a dependency', () => { const s=scenario(); markDone(s,0); s.evidence['SD-100'].build=false; assert.equal(select(s).state,'STOP'); });
test('failed integration appears as a report blocker', () => { const s=scenario(); const report=renderReport({observation:{observedAt:s.now,acceptedTasks:s.tasks},decision:{state:'INTEGRATION BLOCKED',reason:'Hosted CI failed'}}); assert.match(report,/Blocking issues: Hosted CI failed/); });
test('authorized dependency cycles stop', () => { const s=scenario(); s.tasks[0].dependencies=['SD-101']; s.grant.taskDigests['SD-100']=taskDigest(s.tasks[0]); assert.match(select(s).reason,/cycle/); });
test('blocker policy stop-batch blocks independent selection', () => { const s=scenario(); s.tasks[0].status='Blocked'; assert.equal(select(s).state,'STOP'); });
test('skip-independent only permits valid independent work', () => { const s=scenario(2); s.tasks[0].status='Blocked'; s.grant.blockedPolicy='skip-independent'; assert.equal(select(s).state,'NO AUTHORIZED WORK'); s.tasks[1].dependencies=[]; s.grant.taskDigests['SD-101']=taskDigest(s.tasks[1]); assert.equal(select(s).taskId,'SD-101'); });
test('malformed checkpoint result rejected', () => { const s=scenario();const c=checkpoint(s,0);c.result='automatically approved';assert.throws(()=>validateCheckpoint(c)); });
test('malformed task blocks rejected', () => { assert.throws(()=>parseTasks('```icm-task\n{no}\n```')); });
test('daily report distinguishes registry claims from proof and requires no reply',()=>{const s=scenario();const output=renderReport({observation:{observedAt:s.now,acceptedTasks:s.tasks,historicalCompletedIds:[],branch:s.repo.branch,head:s.repo.head,dirty:false,changedEntries:0,verificationArtifacts:[]},decision:select(s)});assert.match(output,/registry claims/);assert.match(output,/Response optional/);assert.match(output,/PROPOSED|No proposal/);});
test('synthetic fixture locking prevents concurrent owner',async()=>{const dir=await mkdtemp(join(tmpdir(),'icm-fixture-'));const path=join(dir,'test.lock');try{const release=await acquireFixtureLock(path,'owner-a');await assert.rejects(acquireFixtureLock(path,'owner-b'));await release();const release2=await acquireFixtureLock(path,'owner-b');await release2();}finally{await rm(dir,{recursive:true,force:true});}});
test('changed fixture lock owner prevents unsafe release',async()=>{const dir=await mkdtemp(join(tmpdir(),'icm-fixture-'));const path=join(dir,'test.lock');try{const release=await acquireFixtureLock(path,'owner-a');await writeFile(path,'different-owner');await assert.rejects(release(),/ownership changed/);assert.equal(await readFile(path,'utf8'),'different-owner');}finally{await rm(dir,{recursive:true,force:true});}});

test('real git inspector observes disposable checkout without mutating files',async()=>{
  const { mkdir } = await import('node:fs/promises');
  const { execFileSync } = await import('node:child_process');
  const { inspectRepository } = await import('../../scripts/icm-automation/inspect.mjs');
  const dir=await mkdtemp(join(tmpdir(),'icm-git-'));
  try {
    await mkdir(join(dir,'docs')); await mkdir(join(dir,'icm','03_verify','output'),{recursive:true});
    await writeFile(join(dir,'docs','TASKS.md'),'# Tasks\nCompleted tasks:\n\n- SD-001\n\n');
    const git=(...args)=>execFileSync('git',args,{cwd:dir,stdio:['ignore','pipe','pipe']});
    git('init','-q');git('config','user.name','Fixture User');git('config','user.email','fixture@example.com');
    git('remote','add','origin','https://github.com/maguellalmike209/schooldashboard.git');
    git('add','.');git('commit','-qm','fixture');
    const before=await readFile(join(dir,'docs','TASKS.md'),'utf8');
    const a=await inspectRepository(dir);
    const after=await readFile(join(dir,'docs','TASKS.md'),'utf8');
    assert.equal(a.repository,'maguellalmike209/schooldashboard');
    assert.equal(a.dirty,false);assert.equal(a.remoteStatus,'UNKNOWN');
    assert.equal(before,after);
    assert.equal(String(git('status','--porcelain')), '');
  } finally { await rm(dir,{recursive:true,force:true}); }
});

test('a task started without satisfied dependencies cannot resume', () => {
  const s=scenario();s.tasks[8].status='In progress';s.evidence['SD-108']={plan:true};s.checkpoint=checkpoint(s,8);
  assert.match(select(s).reason,/proven completed dependencies/);
});
test('stop-batch honors ordering when a planned task depends on unfinished external work',()=>{
  const s=scenario(2);s.tasks[0].dependencies=['SD-050'];s.grant.taskDigests['SD-100']=taskDigest(s.tasks[0]);
  s.tasks[1].dependencies=[];s.grant.taskDigests['SD-101']=taskDigest(s.tasks[1]);
  assert.equal(select(s).state,'STOP');
});

test('explicit skip-independent permits later task around an earlier blocked dependent',()=>{
  const s=scenario(3);s.tasks[0].status='Blocked';s.tasks[1].status='Blocked';s.tasks[2].dependencies=[];
  s.grant.blockedPolicy='skip-independent';s.grant.taskDigests['SD-102']=taskDigest(s.tasks[2]);
  assert.equal(select(s).taskId,'SD-102');
});
