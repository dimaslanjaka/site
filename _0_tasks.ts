import spawn from 'cross-spawn';

spawn('gulp', ['--tasks', '--json'], { cwd: __dirname, stdio: 'inherit' });
