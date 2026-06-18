# AGENTS.md

## Cursor Cloud specific instructions

### What this is
A fully static client-side website (Korean Pokémon "띠부씰" sticker collection tracker), deployed to GitHub Pages at `https://infra-and.github.io/pokedoc/`. There is **no build step, no package manager, and no backend** to install — just HTML/CSS/JS served as static files.

### Running it
Serve the repository root over HTTP and open `index.html`:

```
python3 -m http.server 8000
```

Then browse `http://localhost:8000/`. Opening files via `file://` mostly works but use the HTTP server so relative asset paths and history/URL features behave like production.

### Architecture notes (non-obvious)
- State (which stickers are collected) is stored in the browser's `localStorage`, keyed per collection (see `storage` fields in `data/cards.js`). Progress bars on the homepage are derived from these keys, so clearing browser storage resets progress.
- The homepage recalculates progress every 3s and on focus/visibility change (`js/main.js`), so navigating back from a detail page reflects newly collected stickers.
- A Firebase Realtime Database REST endpoint is used only for a visitor counter and the suggestion box (`firebaseBaseUrl` in `js/suggestions.js`, `js/admin.js`, and inline scripts in `main/*.html`). These calls fail gracefully and are **not required** for the core app to work offline/locally.

### Lint / test / build
There is no lint, automated test suite, or build tooling in this repo. Validate changes by serving the site and exercising the affected page in the browser.
