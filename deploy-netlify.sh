#!/bin/bash

# Netlify Deployment Script
# This script triggers a build on Netlify using their API

echo "🚀 Deploying to Netlify..."

# Get Netlify Site ID from netlify.toml or environment
SITE_ID="${NETLIFY_SITE_ID:-}"
AUTH_TOKEN="${NETLIFY_AUTH_TOKEN:-}"

if [ -z "$SITE_ID" ]; then
    echo "⚠️  NETLIFY_SITE_ID not set. Please create a Netlify site and get the Site ID."
    echo "Visit: https://app.netlify.com/"
    exit 1
fi

if [ -z "$AUTH_TOKEN" ]; then
    echo "⚠️  NETLIFY_AUTH_TOKEN not set. Please set your Netlify personal access token."
    echo "Get it from: https://app.netlify.com/user/applications#personal-access-tokens"
    exit 1
fi

# Trigger a new build
echo "📦 Triggering build..."
BUILD_RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/builds")

BUILD_ID=$(echo "$BUILD_RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
BUILD_URL=$(echo "$BUILD_RESPONSE" | grep -o '"admin_url":"[^"]*' | cut -d'"' -f4)

if [ -n "$BUILD_ID" ]; then
    echo "✅ Build triggered successfully!"
    echo "📋 Build ID: $BUILD_ID"
    echo "🔗 View build: $BUILD_URL"
    echo ""
    echo "⏳ Waiting for build to complete..."
    sleep 5

    # Poll build status
    for i in {1..30}; do
        STATUS=$(curl -s -H "Authorization: Bearer $AUTH_TOKEN" \
          "https://api.netlify.com/api/v1/sites/$SITE_ID/builds/$BUILD_ID" | \
          grep -o '"state":"[^"]*' | cut -d'"' -f4)

        if [ "$STATUS" = "ready" ] || [ "$STATUS" = "published" ]; then
            echo "✅ Build completed successfully!"
            SITE_URL=$(curl -s -H "Authorization: Bearer $AUTH_TOKEN" \
              "https://api.netlify.com/api/v1/sites/$SITE_ID" | \
              grep -o '"ssl_url":"[^"]*' | cut -d'"' -f4)
            echo "🌐 Site URL: $SITE_URL"
            exit 0
        elif [ "$STATUS" = "error" ]; then
            echo "❌ Build failed!"
            echo "📋 Check logs at: $BUILD_URL"
            exit 1
        fi

        echo "⏳ Build status: $STATUS (attempt $i/30)"
        sleep 10
    done

    echo "⏰ Build is still in progress. Check the status at: $BUILD_URL"
else
    echo "❌ Failed to trigger build"
    echo "Response: $BUILD_RESPONSE"
    exit 1
fi
