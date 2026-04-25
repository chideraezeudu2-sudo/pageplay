export class BaseGame {
  constructor(ctx, canvas, options = {}) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.pvpMode = options.pvp || false;
    this.pvpManager = options.pvpManager || null;
    this.domElements = options.domElements || [];
    this.score = 0;
    this.running = false;
    this.animationId = null;
  }

  start() { this.running = true; this.gameLoop(); }
  stop() { this.running = false; if (this.animationId) cancelAnimationFrame(this.animationId); }
  gameLoop() { if (!this.running) return; this.update(); this.draw(); this.animationId = requestAnimationFrame(() => this.gameLoop()); }
  update() {}
  draw() {}
  onKeyDown(key) {}
  onMouseMove(x, y) {}
  onMouseDown(button, x, y) {}
  onPeerMessage(data) {}
  getState() { return {}; }
}
