# Dashboard Startpage

A personal browser startpage with a glass dashboard layout, quick links, auto-focused search, weather, themes, and persistent tasks.

Demo: [https://justfady.github.io/startpage/](https://justfady.github.io/startpage/)

## What You Get

- Responsive glass dashboard for desktop and mobile.
- Search box that can autofocus when used as a browser new-tab page.
- Type-anywhere search fallback when the page itself has focus.
- Click-to-cycle background themes with saved preference.
- Weather from `wttr.in` with a cached last-known value.
- Persistent task list stored in browser `localStorage`.
- Quick links grouped by general, development, and media categories.
- Local fonts, app icons, backgrounds, and a web app manifest.

## Set Up Your Own

This is a plain static site. There is no framework, package install, account, or build step.

1. Fork this repository, or download/clone it:

```sh
git clone https://github.com/JustFady/startpage.git
cd startpage
```

2. Make it yours:

- Edit quick links in `index.html`.
- Change the page title, footer credit, and source link in `index.html`.
- Replace `images/avatar.png`, `images/bg1.jpg`, `images/bg2.jpg`, `images/bg3.jpg`, and `images/bg4.jpg`.
- Update theme colors and background mappings in the `themes` array in `script.js`.
- Change the search provider in `handleSearch()` inside `script.js`.
- Rename the app in `manifest.json`.
- Adjust layout, spacing, and colors in `style.css`.

3. Run it locally by opening `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

4. Deploy it anywhere that can host static files.

For GitHub Pages, push your fork to GitHub, then enable Pages for the `main` branch in your repository settings. After it publishes, your URL will usually look like:

```text
https://YOUR_USERNAME.github.io/startpage/
```

## Browser New-Tab Use

The page works as a normal hosted site, but browsers often keep the address bar focused on regular pages. If you want typing in a fresh tab to go straight into the glass search bar, use a new-tab redirect extension and point it at your deployed URL.

Example:

```text
https://YOUR_USERNAME.github.io/startpage/
```

If autofocus does not apply after a change, reload the extension from your browser extensions page and open a brand-new tab.

The checked-in `manifest.json` is a web app manifest for installable site metadata. It is not a Chrome extension manifest. To package this as an unpacked extension, add a separate extension manifest with a new-tab override.

## Project Structure

```text
.
├── index.html       # Page markup, links, footer, asset references
├── style.css        # Layout, themes, and responsive styling
├── script.js        # Search, weather, tasks, time, quotes, and themes
├── manifest.json    # Web app manifest for installable/PWA metadata
├── images/          # Backgrounds, icons, and avatar
└── fonts/           # Local SpaceMono Nerd Font files
```

## Notes

- Weather uses `wttr.in`, so it depends on network availability and that service being reachable.
- Tasks, theme preference, and cached weather are stored in browser `localStorage`.
- Cache-busting query strings, such as `script.js?v=22`, live in `index.html`. Bump them when your deployed page keeps serving old assets.

## License

Personal project by [Fady Youssef](https://fadyyoussef.dev/). Feel free to fork or adapt it for your own startpage.
