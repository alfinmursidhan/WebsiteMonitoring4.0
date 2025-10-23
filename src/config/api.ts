// API Configuration
export const API_CONFIG = {
  TEMPERATURE_API: {
    URL: import.meta.env.VITE_TEMPERATURE_API_URL || 'https://api-sensor-tanah.whiteforest-7d22ee8f.southeastasia.azurecontainerapps.io/api/temperatures',
    KEY: import.meta.env.VITE_TEMPERATURE_API_KEY || 'jashuI&WEUEHCznxnnskawo8e8TYYgbhsafbjgovoosdfr&Angga',
  },
  TUYA_API: {
    BASE_URL: import.meta.env.VITE_TUYA_BASE_URL || 'https://openapi-sg.iotbing.com',
    CLIENT_ID: import.meta.env.VITE_TUYA_CLIENT_ID || '7gx9swfk5a3m4gjxyutt',
    CLIENT_SECRET: import.meta.env.VITE_TUYA_CLIENT_SECRET || 'ba56be8ae0ef4b578be565d1dcee7dff',
    PROJECT_CODE: import.meta.env.VITE_TUYA_PROJECT_CODE || 'p1761125556556ykr4av',
    DEVICE_ID: import.meta.env.VITE_TUYA_DEVICE_ID || 'a3953c06bbdf6d74d8mm5h', // MCB Device ID
  },
  POLLING_INTERVAL: Number(import.meta.env.VITE_POLLING_INTERVAL) || 30000,
};

// Helper function untuk membuat headers dengan API Key (Temperature API)
export const getApiHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': API_CONFIG.TEMPERATURE_API.KEY, // Format yang benar untuk API ini
  };
};

// Helper function untuk membuat headers Tuya API
export const getTuyaApiHeaders = (accessToken?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
};

// Helper function untuk generate signature Tuya (jika diperlukan)
export const generateTuyaSignature = (
  clientId: string,
  _clientSecret: string,
  timestamp: string,
  nonce: string,
  method: string,
  url: string,
  body?: string
): string => {
  // Implementation akan disesuaikan dengan requirement Tuya API
  // Biasanya menggunakan HMAC-SHA256
  const _stringToSign = `${method}\n${url}\n${body || ''}\n${clientId}\n${timestamp}\n${nonce}`;
  
  // Note: Untuk production, gunakan crypto library yang proper
  // Sementara return placeholder
  return `signature_${timestamp}`;
};
