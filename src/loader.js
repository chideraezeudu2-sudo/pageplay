(function() {
  if (window.__PagePlayLoaded) return;
  window.__PagePlayLoaded = true;

  const CDN_URL = 'https://pageplay.example.com'; // Will update with actual CDN

  // Add CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = CDN_URL + '/styles.css';
  document.head.appendChild(link);

  // Add PeerJS
  const peerScript = document.createElement('script');
  peerScript.src = 'https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js';
  document.head.appendChild(peerScript);

  // Load main script
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = `
    import { GameManager } from '${CDN_URL}/main.js';
    window.PagePlay = new GameManager();
    window.PagePlay.init();
  `;
  document.head.appendChild(script);
})();
