export class PvPManager {
  constructor(onDataCallback) { this.peer = null; this.conn = null; this.onData = onDataCallback; }
  host() { return new Promise((resolve) => { if (!window.Peer) { resolve(null); return; } this.peer = new window.Peer(); this.peer.on('open', id => { this.peer.on('connection', conn => { this.conn = conn; this.conn.on('data', data => this.onData(data)); resolve(id); }); }); }); }
  join(hostId) { return new Promise((resolve) => { if (!window.Peer) { resolve(null); return; } this.peer = new window.Peer(); this.conn = this.peer.connect(hostId); this.conn.on('open', () => { this.conn.on('data', data => this.onData(data)); resolve(); }); }); }
  send(data) { if (this.conn && this.conn.open) this.conn.send(data); }
}
