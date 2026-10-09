process.stdin.resume();
let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  if (input.includes('HANG')) { setInterval(() => {}, 1000); return; }
  if (input.includes('BAD_JSON')) { process.stdout.write('not-json\n'); return; }
  process.stdout.write(JSON.stringify({ type: 'thread.started', thread_id: 'synthetic' }) + '\n');
  process.stdout.write(JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 2, output_tokens: 3 }, secret: input }) + '\n');
  if (input.includes('FAIL')) process.exitCode = 1;
});
