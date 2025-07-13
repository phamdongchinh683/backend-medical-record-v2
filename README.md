# Medical Record Backend with Dynamic Smart Contract Support

This backend supports connecting to smart contracts with addresses sent from the client. The system validates contract addresses and creates contract instances dynamically.

## Features

- **Dynamic Contract Connection**: Connect to any MedicalRecord contract by providing its address
- **Address Validation**: Validates contract addresses and verifies contract existence
- **Flexible API**: All contract operations support dynamic contract addresses
- **Error Handling**: Comprehensive error handling for invalid addresses and contract operations

## API Endpoints

### Contract Information
```http
POST /contract/contract-info
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890"
}
```

### Registration
```http
POST /contract/register-patient
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890"
}
```

```http
POST /contract/register-doctor
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890"
}
```

### Role Management
```http
POST /contract/get-role
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "address": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
}
```

### Medical Records
```http
POST /contract/add-record
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "patientAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
}
```

```http
POST /contract/medical-records
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "patientAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
}
```

### Permissions
```http
POST /contract/grant-permission
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "doctorAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
}
```

```http
POST /contract/revoke-permission
Content-Type: application/json

{
  "contractAddress": "0x1234567890123456789012345678901234567890",
  "doctorAddress": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
}
```

## Client Usage Examples

### JavaScript/TypeScript Client

```typescript
class MedicalRecordClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async validateContract(contractAddress: string) {
    const response = await fetch(`${this.baseUrl}/contract/contract-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractAddress }),
    });
    return response.json();
  }

  async registerAsPatient(contractAddress: string) {
    const response = await fetch(`${this.baseUrl}/contract/register-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractAddress }),
    });
    return response.json();
  }

  async getMedicalRecords(contractAddress: string, patientAddress: string) {
    const response = await fetch(`${this.baseUrl}/contract/medical-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contractAddress, patientAddress }),
    });
    return response.json();
  }
}

// Usage
const client = new MedicalRecordClient('http://localhost:3000');

// Validate contract before using
const contractInfo = await client.validateContract('0x1234567890123456789012345678901234567890');
console.log('Contract info:', contractInfo);

// Register as patient
const registration = await client.registerAsPatient('0x1234567890123456789012345678901234567890');
console.log('Registration result:', registration);

// Get medical records
const records = await client.getMedicalRecords(
  '0x1234567890123456789012345678901234567890',
  '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
);
console.log('Medical records:', records);
```

### React Hook Example

```typescript
import { useState, useCallback } from 'react';

interface ContractOperation {
  contractAddress: string;
  loading: boolean;
  error: string | null;
  data: any;
}

export const useContractOperation = () => {
  const [state, setState] = useState<ContractOperation>({
    contractAddress: '',
    loading: false,
    error: null,
    data: null,
  });

  const executeOperation = useCallback(async (
    operation: string,
    contractAddress: string,
    additionalData: any = {}
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/contract/${operation}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractAddress,
          ...additionalData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Operation failed');
      }

      setState(prev => ({
        ...prev,
        contractAddress,
        loading: false,
        data: result,
      }));

      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    executeOperation,
  };
};

// Usage in React component
const MedicalRecordComponent = () => {
  const { contractAddress, loading, error, data, executeOperation } = useContractOperation();

  const handleRegisterPatient = async () => {
    try {
      await executeOperation('register-patient', '0x1234567890123456789012345678901234567890');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <div>
      <button onClick={handleRegisterPatient} disabled={loading}>
        {loading ? 'Registering...' : 'Register as Patient'}
      </button>
      {error && <p>Error: {error}</p>}
      {data && <p>Success: {JSON.stringify(data)}</p>}
    </div>
  );
};
```

## Environment Variables

Make sure to set these environment variables:

```env
RPC_URL=https://your-ethereum-rpc-url
PRIVATE_KEY=your-private-key
CONTRACT_ADDRESS=default-contract-address
```

## Error Handling

The API includes comprehensive error handling:

- **Invalid Address Format**: Returns 400 if the contract address is not a valid Ethereum address
- **Contract Not Found**: Returns 400 if no contract exists at the provided address
- **Transaction Failures**: Returns 500 with detailed error information
- **Network Issues**: Returns 500 for RPC connection problems

## Security Considerations

1. **Address Validation**: All contract addresses are validated before use
2. **Contract Verification**: The system verifies that a contract exists at the provided address
3. **Error Sanitization**: Error messages are sanitized to prevent information leakage
4. **Rate Limiting**: Consider implementing rate limiting for production use

## Testing

You can test the API using curl:

```bash
# Validate contract
curl -X POST http://localhost:3000/contract/contract-info \
  -H "Content-Type: application/json" \
  -d '{"contractAddress": "0x1234567890123456789012345678901234567890"}'

# Register as patient
curl -X POST http://localhost:3000/contract/register-patient \
  -H "Content-Type: application/json" \
  -d '{"contractAddress": "0x1234567890123456789012345678901234567890"}'
``` # backend-medical-record-v2
