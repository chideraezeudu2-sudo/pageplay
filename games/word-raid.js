import { BaseGame } from './base-game.js';
import { scanPage } from '../utils/dom-scanner.js';

export class WordRaid extends BaseGame {
  constructor(ctx, canvas, options) {
    super(ctx, canvas, options);
    this.letters = [];
    this.words = [];
    this.projectiles = [];
    this.cursor = { x: canvas.width/2, y: canvas.height/2 };
    this.lastShot = 0;
    this.shootCooldown = 200;
  }

  start() {
    this.initFromPage();
    this.setupEventListeners();
    super.start();
  }

  initFromPage() {
    const elements = this.domElements.length ? this.domElements : scanPage();
    const textElements = elements.filter(el => el.text && el.text.trim().length > 0);
    let yOffset = 50;
    for (let el of textElements) {
      const wordsInEl = el.text.split(/\s+/);
      let xOffset = 50;
      for (let wi = 0; wi < wordsInEl.length; wi++) {
        const word = wordsInEl[wi];
        const wordObj = { element: el.element, text: word, x: xOffset, y: yOffset, letters: word.split('').map((ch, li) => ({ char: ch, x: xOffset + li * 15, y: yOffset, active: true })) };
        this.words.push(wordObj);
        wordObj.letters.forEach((letter, idx) => {
          this.letters.push({ ...letter, wordIndex: this.words.length - 1, letterIndex: idx });
        });
        xOffset += word.length * 15 + 20;
      }
      yOffset += 40;
    }
  }

  update() {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.projectiles[i].x += this.projectiles[i].vx;
      this.projectiles[i].y += this.projectiles[i].vy;
      if (this.projectiles[i].x > this.canvas.width || this.projectiles[i].x < 0 || this.projectiles[i].y > this.canvas.height || this.projectiles[i].y < 0) {
        this.projectiles.splice(i,1);
        continue;
      }
      for (let j = 0; j < this.letters.length; j++) {
        const l = this.letters[j];
        const dist = Math.hypot(this.projectiles[i].x - l.x, this.projectiles[i].y - l.y);
        if (dist < 12) {
          this.letters.splice(j,1);
          this.projectiles.splice(i,1);
          this.score++;
          break;
        }
      }
    }
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = 'bold 20px monospace';
    this.ctx.fillStyle = '#ff6600';
    this.letters.forEach(l => {
      this.ctx.fillText(l.char, l.x, l.y + 20);
    });
    this.ctx.beginPath();
    this.ctx.arc(this.cursor.x, this.cursor.y, 10, 0, 2*Math.PI);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    this.projectiles.forEach(p => {
      this.ctx.fillStyle = 'yellow';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 4, 0, 2*Math.PI);
      this.ctx.fill();
    });
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px monospace';
    this.ctx.fillText(\`Score: \${this.score}\`, 10, 30);
  }

  onMouseMove(x, y) {
    this.cursor.x = x;
    this.cursor.y = y;
  }

  onMouseDown(x, y) {
    const now = Date.now();
    if (now - this.lastShot < this.shootCooldown) return;
    this.lastShot = now;
    const angle = Math.atan2(y - this.cursor.y, x - this.cursor.x);
    this.projectiles.push({ x: this.cursor.x, y: this.cursor.y, vx: Math.cos(angle) * 8, vy: Math.sin(angle) * 8 });
  }

  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      this.onMouseMove(e.clientX, e.clientY);
    });
    this.canvas.addEventListener('mousedown', (e) => {
      this.onMouseDown(e.clientX, e.clientY);
    });
  }
}
