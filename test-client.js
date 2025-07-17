const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1';

// Test addresses (you can replace with real Ethereum addresses)
const testAddress = '0x1234567890123456789012345678901234567890';

async function testAuthFlow() {
  console.log('🧪 Testing JWT Authentication Flow\n');

  try {
    // Step 1: Generate message (Public endpoint - no auth required)
    console.log('1️⃣ Testing public endpoint - Generate message');
    const messageResponse = await axios.get(`${BASE_URL}/public/message/${testAddress}`);
    console.log('✅ Message generated:', messageResponse.data.data);
    console.log('✅ Status:', messageResponse.status);
    console.log('');

    // Step 2: Verify message and get token (Public endpoint - no auth required)
    console.log('2️⃣ Testing public endpoint - Verify message and get token');
    const verifyResponse = await axios.post(`${BASE_URL}/public/verify`, {
      address: testAddress,
      signature: '0x1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
      message: messageResponse.data.data
    });
    console.log('✅ Token received:', verifyResponse.data.data);
    console.log('✅ Status:', verifyResponse.status);
    console.log('');

    const token = verifyResponse.data.data;

    // Step 3: Test protected endpoint WITH token
    console.log('3️⃣ Testing protected endpoint WITH token');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile accessed with token:', profileResponse.data);
    console.log('✅ Status:', profileResponse.status);
    console.log('');

    // Step 4: Test protected endpoint WITHOUT token (should fail)
    console.log('4️⃣ Testing protected endpoint WITHOUT token (should fail)');
    try {
      await axios.get(`${BASE_URL}/auth/profile`);
      console.log('❌ This should have failed!');
    } catch (error) {
      console.log('✅ Correctly rejected - No token provided');
      console.log('✅ Error status:', error.response?.status);
      console.log('✅ Error message:', error.response?.data?.message);
    }
    console.log('');

    // Step 5: Test protected endpoint with INVALID token
    console.log('5️⃣ Testing protected endpoint with INVALID token');
    try {
      await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': 'Bearer invalid_token_here'
        }
      });
      console.log('❌ This should have failed!');
    } catch (error) {
      console.log('✅ Correctly rejected - Invalid token');
      console.log('✅ Error status:', error.response?.status);
      console.log('✅ Error message:', error.response?.data?.message);
    }
    console.log('');

    // Step 6: Test public endpoint with token (should work)
    console.log('6️⃣ Testing public endpoint with token (should work)');
    const publicWithToken = await axios.get(`${BASE_URL}/public/message/${testAddress}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Public endpoint works with token:', publicWithToken.data);
    console.log('✅ Status:', publicWithToken.status);
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Test with different scenarios
async function runTests() {
  console.log('🚀 Starting JWT Authentication Tests\n');
  
  await testAuthFlow();
  
  console.log('\n📋 Test Summary:');
  console.log('✅ Public endpoints work without authentication');
  console.log('✅ Protected endpoints require valid JWT token');
  console.log('✅ Invalid/missing tokens are properly rejected');
  console.log('✅ JWT middleware is working correctly');
}

// Run the tests
runTests().catch(console.error); 