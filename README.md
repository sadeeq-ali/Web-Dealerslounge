# DealersLounge landing page

A responsive, buildless website based on the DealersLounge React Native app’s cobalt palette, Poppins fonts, logo, and vehicle photography. All assets are served locally.

## Preview

Run `python3 -m http.server 8080` in this directory and visit `http://localhost:8080`.

## Contents

- `index.html`: product overview, illustrative app preview, inventory/demand/matching features, workflow, FAQs, and app availability.
- `assets/css/styles.css`: responsive styling and locally hosted fonts.
- `assets/js/main.js`: current footer year.
- `privacy/index.html`: privacy policy covering collected data, providers, permissions, retention, and account deletion.

## Launch details

Store listing URLs were not present in the app source. The page labels both stores as coming soon and provides the existing support email for access enquiries. Replace these with approved listing links when available. The privacy policy is based on the local mobile app and backend source. Confirm the operator identity, monitored support address, production providers, retention practices, and deletion cleanup operation before store submission. Host `/privacy/` on a publicly accessible HTTPS domain and connect the app’s Settings privacy button (currently navigating to NotFound) to that URL. The external deletion instructions are at `/privacy/#delete-account`. The app visual is an illustrative HTML composition, not an actual screenshot. No signup data is collected.

## Download-first homepage

`index.html` is a compact download hub. `explore.html` retains the full product story behind the Explore DealersLounge link. The home uses a viewport-height layout at typical screen sizes, while allowing scrolling on short screens or with enlarged text for accessibility. Store buttons and QR areas are explicitly unavailable until real store URLs are supplied; no nonfunctional QR patterns are shown.
