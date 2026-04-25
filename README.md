# PagePlay 🎮

Turn any webpage into a multiplayer gaming arena.

## Features

- **12 Unique Games**: Word Raid, Link Defender, Scroll Racer, CSS Capture, DOM Zapper, Image Breaker, Form Flier, Headline Hunter, Button Basher, Section Sweeper, Flappy Page, Page Snake
- **PvP Modes**: Single Player, Local PvP (2 players), Online PvP (WebRTC)
- **Bookmarklet**: Inject into any website via browser bookmark
- **Monetization**: 5-min demo, \$2.99/mo subscription, \$5.99 lifetime
- **No Installation**: Works on any webpage, no app needed

## Project Structure

\`\`\`
/pageplay
├── games/              # 12 game implementations
├── network/            # PvP & WebRTC (PeerJS)
├── utils/              # DOM scanner, demo lock
├── src/                # Game manager, loader, main app
├── backend/            # Firebase functions (Stripe, auth)
├── package.json
└── README.md
\`\`\`

## Getting Started

1. Clone repo
2. \`npm install\`
3. \`npm run dev\` for local testing
4. \`npm run build\` for production
5. Deploy to CDN
6. Generate bookmarklet with \`npm run minify\`

## Next: Games Implementation

All 12 games need to be built extending BaseGame. See \`games/word-raid.js\` for reference.

## Deployment

- Frontend: Netlify, Vercel, or any static host
- Backend: Firebase Functions or Netlify Functions
- Monetization: Stripe + Firebase Firestore
