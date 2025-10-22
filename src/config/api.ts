// API Configuration
export const API_CONFIG = {
  TEMPERATURE_API: {
    URL: import.meta.env.VITE_TEMPERATURE_API_URL || 'https://api-sensor-tanah.whiteforest-7d22ee8f.southeastasia.azurecontainerapps.io/api/temperatures',
    KEY: import.meta.env.VITE_TEMPERATURE_API_KEY || 'jashuI&WEUEHCznxnnskawo8e8TYYgbhsafbjgovoosdfr&Angga',
  },
  // Tambahkan API endpoints lain di sini jika diperlukan
  POLLING_INTERVAL: Number(import.meta.env.VITE_POLLING_INTERVAL) || 30000,
};

// Helper function untuk membuat headers dengan API Key
export const getApiHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': API_CONFIG.TEMPERATURE_API.KEY, // Format yang benar untuk API ini
  };
};
