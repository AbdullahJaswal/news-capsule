#!/bin/sh

echo "Installing dependencies"
npm install

echo "Creating build"
npm run build

echo "Starting Server"
npm run start
