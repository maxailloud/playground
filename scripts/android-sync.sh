#!/bin/sh

PROJECT_NAME="$1"

npx nx run $PROJECT_NAME:sync:android
