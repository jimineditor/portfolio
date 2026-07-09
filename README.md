# JIMIN Portfolio

Video editor portfolio site for JIMIN.

This repository is a static website built with plain HTML, CSS, and JavaScript. It is structured for simple GitHub Pages deployment from the `main` branch.

## Structure

```text
.
├── index.html
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Files

- `index.html`: Main page markup and portfolio sections.
- `css/styles.css`: Layout, responsive styling, and subtle animations.
- `js/main.js`: Video data, category filtering, modal behavior, copy button, and motion interactions.

## Local Preview

Open `index.html` directly in a browser, or run a simple static server from the repository root:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Editing

To add or update portfolio videos, edit the `VIDEOS` array in `js/main.js`.

Each item uses this format:

```js
{ cat: "DONGHAK", id: "YouTubeVideoId", views: 32000 }
```

- `cat`: Category name. It should match one of the category names in `CATS`.
- `id`: YouTube video ID.
- `views`: View count used for sorting within each category.

## Deployment

Push changes to `main`. If GitHub Pages is enabled for this repository, the site will be served from `index.html`.
