#!/usr/bin/env bash

PATH_PREFIX="/blog/" npx @11ty/eleventy || { echo 'build failed' ; exit 1; }
rm -r ~/Site/blog
cp -r _site ~/Site/blog

echo 'Now go and push it!'
