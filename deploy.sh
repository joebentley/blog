#!/usr/bin/env bash

rm -r _site
mkdir _site

PATH_PREFIX="/blog/" npx @11ty/eleventy || { echo 'build failed' ; exit 1; }
rm -r ~/Site/blog
cp -r _site ~/Site/blog

cd ~/Site
git add .
git commit -m "Updated blog"

echo 'Now go and push it!'
