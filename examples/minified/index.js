import '../../dist/pixelDrawer.min.js';

window.init = function(canvasId) {
      const cvsRef = document.getElementById(canvasId);
      const cvsContext = cvsRef.getContext('2d', { alpha: false });
      const cvsImageData = cvsContext.getImageData(0, 0, cvsRef.width, cvsRef.height);

      const lineDrawer = pixelDrawer.default.getLineDrawer(cvsImageData.width, cvsImageData.height, false);

      lineDrawer.data = cvsImageData.data;
      const color = new Uint8Array([22, 209, 109, 255]);
      const centerX = Math.round(cvsImageData.width * 0.5);
      const centerY = Math.round(cvsImageData.height * 0.5);

      cvsRef.onmousemove = (e) => {
        lineDrawer.draw(centerX, centerY, e.offsetX, e.offsetY, color);
        cvsContext.putImageData(cvsImageData, 0, 0);
      }
}
