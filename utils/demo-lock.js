export class DemoLock {
  constructor() {
    this.maxSeconds = 300;
    this.storageKey = 'pageplay_demo_playtime';
    this.activeGameStart = null;
  }
  loadPlayTime() { const saved = localStorage.getItem(this.storageKey); return saved ? parseInt(saved, 10) : 0; }
  savePlayTime(seconds) { localStorage.setItem(this.storageKey, seconds.toString()); }
  canPlay() { if (window.userTier !== 'demo') return true; return this.loadPlayTime() < this.maxSeconds; }
  startGameSession() { if (window.userTier !== 'demo') return; this.activeGameStart = Date.now(); }
  stopGameSession() { if (this.activeGameStart) { const elapsed = Math.floor((Date.now() - this.activeGameStart) / 1000); this.savePlayTime(this.loadPlayTime() + elapsed); this.activeGameStart = null; } }
}
