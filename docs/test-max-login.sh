#!/bin/bash

# MAX Login Test Script
# This script tests the MAX login functionality

echo "🚀 Testing MAX Login Functionality..."
echo "======================================"

# Ensure we're in the correct directory
cd /Users/arog/framework/auto-coder

# Create test directories if they don't exist
mkdir -p generated/reports/screenshots
mkdir -p tests

# Run the login integration test
echo "📝 Running MAX login integration test..."
npx playwright test tests/max-login-integration.test.js --reporter=list

# Run the Cucumber feature test
echo "📝 Running MAX login feature test..."
npx cucumber-js support/features/max-login.feature --require support/steps --require support/hooks.js --format progress

echo "✅ MAX login tests completed!"
echo "🔍 Check generated/reports/screenshots/ for screenshots"
