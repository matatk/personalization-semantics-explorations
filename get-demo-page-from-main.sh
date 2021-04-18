#!/bin/sh
git checkout main
git pull
git checkout gh-pages
git checkout main -- browser-extension/demo.html
git checkout main -- browser-extension/demo.js
git checkout main -- browser-extension/personalization.css
git mv -f browser-extension/* .
