# Alexander's Tennis App — Installation Guide

This is a Progressive Web App (PWA) — a website that installs on Alexander's iPad like a native app, with no Safari browser bar visible. Once installed, video links open inside the app with a "Back to Playbook" button so Alexander can return easily.

## What's in this folder

- `index.html` — the app itself (Alexander's version, no "For Parents" tab)
- `manifest.json` — tells iOS this is an installable app
- `sw.js` — service worker for offline access
- `icon-192.png` & `icon-512.png` — home screen icons

## How to install on Alexander's iPad

The PWA needs to be hosted on a web server (it can't be installed directly from the file system). Here are three easy options:

### Option 1: Free hosting on GitHub Pages (recommended, free, permanent)
1. Create a free GitHub account at [github.com](https://github.com)
2. Click "+" → "New repository" → name it `alexander-tennis` → make it **Public** → "Create repository"
3. Click "uploading an existing file" → drag in all files from this folder → "Commit changes"
4. Click **Settings** → **Pages** (left sidebar) → under "Source" select **main** branch → **Save**
5. Wait 1-2 minutes. GitHub will give you a URL like `https://yourname.github.io/alexander-tennis/`
6. Open that URL in **Safari** on Alexander's iPad
7. Tap the **Share** button (square with up arrow) → scroll down → **Add to Home Screen** → **Add**
8. Done! The tennis ball icon now lives on his home screen and opens fullscreen with no Safari chrome.

### Option 2: Free hosting on Netlify Drop (fastest, no account needed)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this entire folder onto the page
3. Netlify gives you a URL instantly (something like `https://random-name.netlify.app`)
4. Open that URL in Safari on Alexander's iPad → **Share** → **Add to Home Screen**

### Option 3: Local network only (advanced)
On a Mac, navigate to this folder in Terminal and run:
```
python3 -m http.server 8000
```
Then on the iPad (same Wi-Fi), open Safari to `http://[your-mac-ip]:8000/` — but this only works while the Mac is on and connected.

## How it works for Alexander

- **Tap a video link** — opens in the in-app player with a yellow "← Back to Playbook" button at the top
- **Tap Back to Playbook** — returns to where he left off in the guide, no Safari, no other apps
- **Suno songs** — open externally (since Suno needs its own player), but the app is one tap away on the home screen
- **Works offline** — the guide itself loads from cache after the first visit. Videos still need internet.

## Note on YouTube videos in the in-app player

YouTube embeds work in the in-app player for almost every video. A small number of YouTube videos are restricted from being embedded by their creator — those will show a "Watch on YouTube" link inside the player, which opens externally. This is rare but possible.

## To update the app later

Replace `index.html` (and any other changed files) on your hosting service. Alexander's iPad will auto-update next time he opens the app while connected to the internet.
