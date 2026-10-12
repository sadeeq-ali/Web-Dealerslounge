# DealersLounge landing page

A responsive, buildless website based on the DealersLounge React Native app’s cobalt palette, Poppins fonts, logo, and vehicle photography. All assets are served locally.

## Preview

Run `python3 -m http.server 8080` in this directory and visit `http://localhost:8080`.

## Contents

- `index.html`: product overview, illustrative app preview, inventory/demand/matching features, workflow, FAQs, and app availability.
- `join/index.html`: compact download page at `/join/`, with store availability and QR areas.
- `explore.html`: compatibility redirect to the homepage.
- `assets/css/styles.css`: responsive styling and locally hosted fonts.
- `assets/js/main.js`: current footer year.
- `privacy/index.html`: privacy policy covering collected data, providers, permissions, retention, and account deletion.

## Launch details

Store listing URLs were not present in the app source. The page labels both stores as coming soon and provides the existing support email for access enquiries. Replace these with approved listing links when available. The privacy policy is based on the local mobile app and backend source. Confirm the operator identity, monitored support address, production providers, retention practices, and deletion cleanup operation before store submission. Host `/privacy/` on a publicly accessible HTTPS domain The app’s Settings privacy button already uses the configured website privacy URL. The external deletion instructions are at `/privacy/#delete-account`. The app visual is an illustrative HTML composition, not an actual screenshot. No signup data is collected.

## Routes

- `/`: full product homepage.
- `/join/`: compact download hub (static hosts redirect `/join` to `/join/`).
- `/privacy/`: privacy policy.
- `/explore.html`: redirects older links to the homepage.

All links are relative, supporting both a domain root and the current GitHub Pages base path `/Web-Dealerslounge/`. No backend router is needed. The React Native website and privacy URLs remain valid.

Store buttons and QR areas stay explicitly unavailable until real store URLs are supplied. The download layout allows scrolling on short screens or with enlarged text for accessibility.
