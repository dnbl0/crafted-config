#!/bin/bash

REPO="/Users/dean.noble/Documents/lktokens/lktokens"

cd "$REPO"

echo "Watching for changes..."

fswatch -o . | while read f
do
  git add .
  git commit -m "Auto update tokens $(date)" || true
  git push origin lexus-gel
  echo "Changes pushed at $(date)"
done