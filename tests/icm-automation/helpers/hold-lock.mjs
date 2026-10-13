import { acquireBrokerLock } from '../../../scripts/icm-automation/lock.mjs';
const lock = await acquireBrokerLock(process.argv[2]);
process.stdout.write('LOCKED\n');
process.stdin.resume();
process.stdin.once('data', async () => { await lock.release({ childrenStopped: true }); process.exit(0); });
