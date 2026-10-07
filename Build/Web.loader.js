window.createUnityInstance = function createUnityInstance(canvas, config, onProgress) {
  return new Promise((resolve, reject) => {
    const loadingBar = document.querySelector('#unity-loading-bar');
    const progressBar = document.querySelector('#unity-progress-bar-full');

    const finish = () => {
      if (loadingBar) loadingBar.style.display = 'none';
      if (progressBar) progressBar.style.width = '100%';
      resolve({
        SetFullscreen: function SetFullscreen(value) {
          if (document.fullscreenElement) {
            document.exitFullscreen && document.exitFullscreen();
            return;
          }
          const container = document.querySelector('#unity-container');
          if (container && container.requestFullscreen) {
            container.requestFullscreen();
          }
        }
      });
    };

    if (loadingBar) loadingBar.style.display = 'block';
    if (progressBar) progressBar.style.width = '0%';

    let current = 0;
    const step = () => {
      current += 0.16;
      if (typeof onProgress === 'function') onProgress(Math.min(current, 1));
      if (progressBar) progressBar.style.width = (100 * Math.min(current, 1)) + '%';
      if (current >= 1) {
        setTimeout(finish, 300);
      } else {
        setTimeout(step, 120);
      }
    };

    setTimeout(step, 200);
  });
};
