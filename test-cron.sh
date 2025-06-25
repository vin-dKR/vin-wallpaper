#!/bin/bash

# Test script for debugging the cron functionality
# Usage: ./test-cron.sh

echo "🧪 Testing Twitter Bot Cron Functionality"
echo "=========================================="

# Check if CRON_SECRET is set
if [ -z "$CRON_SECRET" ]; then
    echo "❌ CRON_SECRET environment variable is not set"
    echo "Please set it with: export CRON_SECRET='your-secret-here'"
    exit 1
fi

echo "✅ CRON_SECRET is set"
echo "🕐 Current UTC time: $(date -u)"

# Test the schedule endpoint
echo ""
echo "📅 Testing schedule endpoint..."
schedule_response=$(curl -s "https://vin-wallpaper.vercel.app/api/schedule?secret=$CRON_SECRET")
echo "Schedule Response: $schedule_response"

# Test the auto-post endpoint
echo ""
echo "🤖 Testing auto-post endpoint..."
auto_post_response=$(curl -s "https://vin-wallpaper.vercel.app/api/cron/auto-post?secret=$CRON_SECRET")
echo "Auto-post Response: $auto_post_response"

echo ""
echo "✅ Test completed!" 