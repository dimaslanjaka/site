// postinstall.cjs
// Run original postinstall commands in a cross-platform way and suppress non-zero exit.
const { spawn } = require('child_process');

function run(command, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, Object.assign({ stdio: 'inherit', shell: true }, opts));
    child.on('close', (code) => resolve(code));
    child.on('error', () => resolve(1));
  });
}

(async () => {
  const commands = [
    { cmd: 'node', args: ['_config.loader.cjs'] },
    { cmd: 'npx', args: ['hexo-theme-flowbite'] }
  ];

  for (const c of commands) {
    try {
      const code = await run(c.cmd, c.args);
      if (code !== 0) {
        console.error('postinstall: command failed:', c.cmd, c.args.join(' '), 'exit code:', code);
        // continue to next command; do not exit non-zero
      }
    } catch (err) {
      console.error('postinstall: error running', c.cmd, err && err.stack ? err.stack : err);
    }
  }

  // finish with success to suppress npm failure
  process.exit(0);
})();
