#!/bin/bash

echo "=========================================="
echo "🚀 Netlify Deployment Script"
echo "=========================================="
echo ""

# Check if Netlify token is provided
NETLIFY_TOKEN="${NETLIFY_TOKEN:-$1}"

if [ -z "$NETLIFY_TOKEN" ]; then
    echo "⚠️  Netlify token not provided!"
    echo ""
    echo "Please set your Netlify Personal Access Token:"
    echo "  export NETLIFY_TOKEN=your_token_here"
    echo "  OR pass it as: ./deploy.sh your_token_here"
    echo ""
    echo "Get your token from:"
    echo "  https://app.netlify.com/user/applications#personal-access-tokens"
    echo ""
    exit 1
fi

echo "✅ Netlify token provided"
echo ""

# Get site ID from netlify.toml or prompt user
SITE_ID=$(grep "site" netlify.toml 2>/dev/null | head -1 | sed 's/.*site *= *"\?\([^"]*\)".*/\1/' || echo "")

if [ -z "$SITE_ID" ]; then
    echo "⚠️  Site ID not found in netlify.toml"
    echo ""
    echo "Please create a Netlify site first:"
    echo "  1. Go to https://app.netlify.com/"
    echo "  2. Click 'Add new site' → 'Import from Git'"
    echo "  3. Connect your GitHub account"
    echo "  4. Select the 'paym' repository"
    echo "  5. Note the Site ID from the URL or site settings"
    echo ""
    read -p "Enter your Netlify Site ID: " SITE_ID
fi

echo "✅ Site ID: $SITE_ID"
echo ""

# Trigger deployment
echo "📦 Triggering deployment from GitHub repository..."
echo "   Repository: you3333ef/paym"
echo "   Branch: main"
echo ""

RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $NETLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys")

# Parse response
BUILD_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
STATE=$(echo "$RESPONSE" | grep -o '"state":"[^"]*' | cut -d'"' -f4)
ADMIN_URL=$(echo "$RESPONSE" | grep -o '"admin_url":"[^"]*' | cut -d'"' -f4)

if [ -z "$BUILD_ID" ]; then
    echo "❌ Failed to trigger deployment"
    echo ""
    echo "Response:"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    exit 1
fi

echo "✅ Deployment triggered successfully!"
echo ""
echo "📋 Deployment Details:"
echo "   Build ID: $BUILD_ID"
echo "   Status: $STATE"
echo "   Admin URL: $ADMIN_URL"
echo ""
echo "🔗 View build progress:"
echo "   $ADMIN_URL"
echo ""
echo "⏳ Waiting for build to complete..."
echo ""

# Poll deployment status
POLL_COUNT=0
MAX_POLLS=60  # 10 minutes max

while [ $POLL_COUNT -lt $MAX_POLLS ]; do
    POLL_COUNT=$((POLL_COUNT + 1))

    STATUS=$(curl -s -H "Authorization: Bearer $NETLIFY_TOKEN" \
      "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys/$BUILD_ID" | \
      grep -o '"state":"[^"]*' | cut -d'"' -f4)

    echo "⏳ Status: $STATE (Polling attempt $POLL_COUNT/$MAX_POLLS)"

    if [ "$STATUS" = "ready" ]; then
        echo ""
        echo "🎉 Build completed successfully!"
        echo ""
        echo "🌐 Your site is live at:"
        SITE_URL=$(curl -s -H "Authorization: Bearer $NETLIFY_TOKEN" \
          "https://api.netlify.com/api/v1/sites/$SITE_ID" | \
          grep -o '"ssl_url":"[^"]*' | cut -d'"' -f4)
        echo "   $SITE_URL"
        echo ""
        echo "✅ Deployment complete!"
        exit 0
    elif [ "$STATUS" = "error" ]; then
        echo ""
        echo "❌ Build failed!"
        echo ""
        echo "📋 Check build logs:"
        echo "   $ADMIN_URL"
        echo ""
        exit 1
    fi

    sleep 10  # Wait 10 seconds between polls
done

echo ""
echo "⏰ Build is still in progress after 10 minutes."
echo "Please check the status at:"
echo "  $ADMIN_URL"
echo ""
