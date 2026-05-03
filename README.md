# Dashboard Startpage

A personal browser startpage with a glass dashboard layout, quick links, auto-focused search, weather, themes, and persistent tasks.

Live site: [https://justfady.github.io/startpage/](https://justfady.github.io/startpage/)

## Overview

This project is built with plain HTML, CSS, and JavaScript. It can run as a static website, but it works best as a browser new-tab page because the glass search bar can receive focus immediately when a new tab opens.

Modern browsers often keep the address bar focused on normal hosted pages. For reliable search autofocus, use the page through a new-tab extension setup instead of only opening the GitHub Pages URL.

## Features

- Glass dashboard layout with responsive desktop and mobile spacing.
- Auto-focused Google search in the glass panel when used as a new-tab page.
- Type-anywhere search fallback when the page itself has focus.
- Click-to-cycle background themes with saved preference.
- Weather from `wttr.in` with cached last-known value.
- Persistent task list with completed states and delete controls.
- Quick links grouped by general, development, and media categories.
- Local custom fonts, app icons, and a web app manifest.

## New Tab Setup

Use this mode if you want typing in a fresh tab to go straight into the glass search bar.

Recommended setup:

1. Install a new-tab redirect extension for your browser.
2. Set the redirect URL to:

```text
https://justfady.github.io/startpage/
```

3. Open a new tab and start typing.

If the search bar does not focus after changes, reload the extension from the extensions page and open a brand-new tab.

The checked-in `manifest.json` is a web app manifest for installable site metadata. It is not a native Chrome extension manifest. If you want to package this project as a standalone unpacked extension, add a separate extension manifest with a new-tab override.

## Static Site Use

You can also use the hosted site directly:

[https://justfady.github.io/startpage/](https://justfady.github.io/startpage/)

When used as a normal hosted page, the browser may keep focus in the address bar. That is browser behavior, not a page bug. Click into the page or use a new-tab extension setup for reliable glass search autofocus.

## Local Development

Open `index.html` directly in a browser, or serve the folder with any static file server.

Example:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

No build step is required.

## Project Structure

```text
.
├── index.html       # Page markup
├── style.css        # Layout, themes, and responsive styling
├── script.js        # Search, weather, tasks, time, and theme behavior
├── manifest.json    # Web app manifest for installable/PWA metadata
├── images/          # Backgrounds, icons, and avatar
└── fonts/           # Local SpaceMono Nerd Font files
```

## Customization

- Quick links: edit the link groups in `index.html`.
- Background themes: update the `themes` array in `script.js`.
- Search provider: change the URL in `handleSearch()` inside `script.js`.
- Avatar and backgrounds: replace files in `images/`.
- Colors and layout: adjust CSS variables and responsive rules in `style.css`.

## Deployment

The live site is published with GitHub Pages from the `main` branch.

Typical deploy flow:

```sh
git add .
git commit -m "Describe the change"
git push origin main
```

GitHub Pages can take a minute to serve the latest HTML. Script and style cache versions are tracked in `index.html` with query strings like `script.js?v=22`.

## Notes

- Weather uses `wttr.in`, so it depends on network availability and that service being reachable.
- Tasks and theme preference are stored in browser `localStorage`.
- The browser controls whether a normal hosted page can steal focus from the address bar. Use the new-tab extension setup when autofocus matters.

## License

Personal project by [Fady Youssef](https://fadyyoussef.dev/). Feel free to fork or adapt it for your own startpage.
