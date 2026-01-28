#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Function to run a test
test_url() {
    local url=$1
    local description=$2
    
    if curl -sf "$url" > /dev/null; then
        echo -e "${GREEN}✓ PASS${NC}: $description"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $description"
        ((FAILED++))
    fi
}

# Function to check if content exists on page
test_content() {
    local url=$1
    local content=$2
    local description=$3
    
    if curl -sf "$url" | grep -q "$content"; then
        echo -e "${GREEN}✓ PASS${NC}: $description"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}: $description"
        ((FAILED++))
    fi
}

echo "========================================"
echo "  Running Tango Site Tests"
echo "========================================"
echo ""

BASE_URL="${BASE_URL:-http://localhost:8080}"

# Test 1: Homepage loads
test_url "$BASE_URL" "Homepage loads"

# Test 2: About page loads
test_url "$BASE_URL/about.html" "About page loads"

# Test 3: Contact page loads
test_url "$BASE_URL/contact.html" "Contact page loads"

# Test 4: CSS file loads
test_url "$BASE_URL/styles.css" "CSS file loads"

# Test 5: JS file loads
test_url "$BASE_URL/script.js" "JavaScript file loads"

# Test 6: Check homepage has expected content
test_content "$BASE_URL" "tango" "Homepage contains 'tango'"

echo ""
echo "========================================"
echo "  Results: $PASSED passed, $FAILED failed"
echo "========================================"

# Exit with error if any tests failed
if [ $FAILED -gt 0 ]; then
    exit 1
fi

exit 0
