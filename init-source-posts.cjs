const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const path = require('path');

const gitDir = path.join(__dirname, 'src-posts', '.git');
const repoUrl = 'https://github.com/dimaslanjaka/source-posts.git';
const branch = 'posts';

// Check if .git directory does not exist
if (!fs.existsSync(gitDir)) {
  // Spawn the git clone command with cwd set to __dirname
  const cloneProcess = spawn('git', ['clone', '--branch', branch, '--single-branch', repoUrl, 'src-posts'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  cloneProcess.on('error', (error) => {
    console.error(`Error executing git clone: ${error.message}`);
  });

  cloneProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Git clone completed successfully.');
    } else {
      console.error(`Git clone process exited with code ${code}.`);
    }
  });
} else {
  const postCwd = path.join(__dirname, 'src-posts');
  spawnSync('git', ['fetch', '--all'], {
    cwd: postCwd,
    stdio: 'inherit',
    shell: true
  });
  spawnSync('git', ['reset', '--hard', `origin/${branch}`], {
    cwd: postCwd,
    stdio: 'inherit',
    shell: true
  });
  if (!fs.existsSync(path.join(postCwd, 'yarn.lock'))) fs.writeFileSync(path.join(postCwd, 'yarn.lock'), '');
  spawnSync('yarn', ['install'], {
    cwd: postCwd,
    stdio: 'inherit',
    shell: true
  });
}
