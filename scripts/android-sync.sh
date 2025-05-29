#!/bin/sh

PROJECT_NAME="$1"

npx nx run android-sync --project=$PROJECT_NAME
