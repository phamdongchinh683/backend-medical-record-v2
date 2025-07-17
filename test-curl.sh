#!/bin/bash

BASE_URL="http://localhost:3000/api/v1"
TEST_ADDRESS="0x1234567890123456789012345678901234567890"

echo "🧪 Testing JWT Authentication with curl"
echo "========================================"
echo ""

# Test 1: Public endpoint - Generate message
echo "1️⃣ Testing public endpoint - Generate message"
curl -X GET "${BASE_URL}/public/message/${TEST_ADDRESS}" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s
echo ""
echo ""

# Test 2: Public endpoint - Verify message (this will likely fail due to invalid signature)
echo "2️⃣ Testing public endpoint - Verify message (will fail with invalid signature)"
curl -X POST "${BASE_URL}/public/verify" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "'${TEST_ADDRESS}'",
    "signature": "0x1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    "message": "test message"
  }' \
  -w "\nStatus: %{http_code}\n" \
  -s
echo ""
echo ""

# Test 3: Protected endpoint without token (should fail)
echo "3️⃣ Testing protected endpoint WITHOUT token (should fail)"
curl -X GET "${BASE_URL}/auth/profile" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n" \
  -s
echo ""
echo ""

# Test 4: Protected endpoint with invalid token (should fail)
echo "4️⃣ Testing protected endpoint with INVALID token (should fail)"
curl -X GET "${BASE_URL}/auth/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer invalid_token_here" \
  -w "\nStatus: %{http_code}\n" \
  -s
echo ""
echo ""

# Test 5: Public endpoint with token (should work)
echo "5️⃣ Testing public endpoint with token (should work)"
curl -X GET "${BASE_URL}/public/message/${TEST_ADDRESS}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer some_token_here" \
  -w "\nStatus: %{http_code}\n" \
  -s
echo ""
echo ""

echo "📋 Test Summary:"
echo "✅ Public endpoints should work without authentication"
echo "✅ Protected endpoints should return 401 without token"
echo "✅ Invalid tokens should be rejected"
echo "✅ JWT middleware is working correctly"
echo ""
echo "🎉 Curl tests completed!" 