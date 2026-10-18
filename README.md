# Senserio Construction Welding — GitHub Pages package

## Why this package is more robust
- All HTML pages are at the archive root.
- CSS is embedded in each HTML page, so the visual design does not depend on the `assets/styles.css` URL resolving.
- Internal page links use relative paths, suitable for a GitHub Pages project URL.
- No `CNAME` is included, to avoid accidentally forcing an unconfigured custom domain while testing.
- Hero/gallery photos load from Unsplash over the internet.

## Upload correctly
1. Extract this ZIP.
2. In your GitHub repository, click Add file → Upload files.
3. Upload the CONTENTS of this extracted folder directly to the repository root (not the containing folder).
4. Ensure index.html is at the top level next to services.html, assets/, etc.
5. Open Settings → Pages. Choose Deploy from a branch, main, /(root), then Save.
6. Wait for deployment and hard-refresh (Ctrl+Shift+R).

## If 404 remains
- A project-site URL usually looks like https://USERNAME.github.io/REPOSITORY/ rather than https://USERNAME.github.io/.
- Confirm Settings → Pages shows the published URL and correct branch/folder.
- Configure DNS and add a custom domain later in Settings → Pages if needed.

## Contact
Human Maleki · +1 778 951 4797 · human@senserio.ca · www.senserio.ca · Vancouver, BC, Canada

## Form limitation
GitHub Pages is static hosting; it does not receive form submissions or uploaded files by itself. Connect the quote form to a form provider/backend before relying on automatic delivery.
