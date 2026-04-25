import { DemoLock } from '../utils/demo-lock.js';
import { scanPage } from '../utils/dom-scanner.js';
import { PvPManager } from '../network/pvp.js';

export class GameManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentGame = null;
    this.games = new Map();
    this.pvpManager = null;
    this.demoLock = new DemoLock();
    this.domElements = [];
  }

  async init() {
    this.createCanvas();
    this.createToolbar();
    this.scanPageElements();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.demoLock.startGameSession();
    this.checkUserTier();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'pageplay-canvas';
    Object.assign(this.canvas.style, {
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 999999, pointerEvents: 'auto'
    });
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.id = 'pageplay-toolbar';
    toolbar.style.cssText = 'position:fixed;top:10px;left:10px;z-index:1000000;background:rgba(0,0,0,0.8);padding:10px;border-radius:5px;color:white;font-family:monospace;';
    toolbar.innerHTML = `<div>🎮 PagePlay Ready</div><div style="font-size:12px;margin-top:5px;">Demo: <span id="pp-timer">5:00</span></div>`;
    document.body.appendChild(toolbar);
  }

  scanPageElements() {
    this.domElements = scanPage();
  }

  checkUserTier() {
    let deviceId = localStorage.getItem('pageplay_device_id');
    if (!deviceId) { deviceId = crypto.randomUUID(); localStorage.setItem('pageplay_device_id', deviceId); }
    window.userTier = window.userTier || 'demo';
  }

  startGame(gameName, pvpMode = 'single') {
    console.log(`Starting ${gameName} in ${pvpMode} mode`);
    this.demoLock.startGameSession();
  }

  stop() {
    if (this.currentGame) this.currentGame.stop();
    this.demoLock.stopGameSession();
  }
}
