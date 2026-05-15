const { watch } = require('fs');
const { exec } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const fileToWatch = path.join(rootDir, 'index.html');
let timeoutId = null;

const run = (command) => new Promise((resolve, reject) => {
  exec(command, { cwd: rootDir }, (error, stdout, stderr) => {
    if (error) {
      reject({ error, stderr: stderr.trim() });
      return;
    }
    resolve(stdout.trim());
  });
});

const deployChanges = async () => {
  try {
    const status = await run('git diff --quiet -- index.html && echo clean || echo dirty');
    if (status === 'clean') {
      return;
    }

    console.log('Detectado cambio en index.html. Commit y push automáticos...');
    await run('git add index.html');
    const commitMessage = `Auto-update index.html: ${new Date().toISOString()}`;
    await run(`git commit -m "${commitMessage}"`);
    await run('git push origin main');
    console.log('Cambios empujados a GitHub con éxito.');
  } catch (err) {
    console.error('Error durante el auto-commit/push:', err.stderr || err.error.message || err);
  }
};

watch(fileToWatch, { persistent: true }, (eventType) => {
  if (eventType !== 'change') {
    return;
  }

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(deployChanges, 1200);
});

console.log('Watcher activo: los cambios en index.html se comprometerán y enviarán automáticamente.');
