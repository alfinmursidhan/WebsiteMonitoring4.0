import { API_CONFIG, getApiHeaders } from '../config/api';

// Types untuk response API temperature
export interface TemperatureReading {
  id?: string;
  temperature: number;
  timestamp?: string;  // Legacy format
  time?: string;       // API format
  location?: string;
  sensorId?: string;
}

export interface TemperatureResponse {
  success: boolean;
  data?: TemperatureReading[];
  error?: string;
  message?: string;
}

class TemperatureService {
  private apiUrl: string;

  constructor() {
    this.apiUrl = API_CONFIG.TEMPERATURE_API.URL;
  }

  /**
   * Mengambil data temperature terbaru dari API
   */
  async getLatestTemperature(): Promise<TemperatureResponse> {
    try {
      console.log('🌡️ Fetching temperature from:', this.apiUrl);
      const headers = getApiHeaders();
      console.log('📋 Request headers:', headers);
      
      const response = await fetch(this.apiUrl, {
        method: 'GET',
        headers: headers,
        mode: 'cors', // Explicitly set CORS mode
      });

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('✅ Temperature data received:', responseData);
      
      // API mengembalikan format: { status: "success", data: [...] }
      if (responseData.status === 'success') {
        // Normalize data format (API uses 'time', we use 'timestamp')
        const normalizedData = (responseData.data || []).map((item: any) => ({
          ...item,
          timestamp: item.time || item.timestamp, // Support both formats
          time: undefined, // Remove to avoid confusion
        }));
        
        return {
          success: true,
          data: normalizedData,
        };
      } else {
        return {
          success: false,
          error: responseData.message || 'Unknown error from API',
        };
      }
    } catch (error) {
      console.error('❌ Error fetching temperature data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Mengambil data temperature dengan filter waktu
   * Note: Jika API tidak support date filter, akan return semua data
   */
  async getTemperatureByDateRange(startDate: string, endDate: string): Promise<TemperatureResponse> {
    try {
      console.log('🔍 Fetching temperature history from:', this.apiUrl);
      console.log('📅 Date range:', startDate, 'to', endDate);
      
      // Coba dulu dengan parameter (jika API support)
      const urlWithParams = new URL(this.apiUrl);
      urlWithParams.searchParams.append('startDate', startDate);
      urlWithParams.searchParams.append('endDate', endDate);

      let response = await fetch(urlWithParams.toString(), {
        method: 'GET',
        headers: getApiHeaders(),
        mode: 'cors',
      });

      // Jika gagal dengan params, coba tanpa params (get all data)
      if (!response.ok) {
        console.log('⚠️ Date filter not supported, fetching all data...');
        response = await fetch(this.apiUrl, {
          method: 'GET',
          headers: getApiHeaders(),
          mode: 'cors',
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ History data received:', responseData);
      
      // API mengembalikan format: { status: "success", data: [...] }
      if (responseData.status === 'success') {
        const allData = responseData.data || [];
        
        // Normalize data format (API uses 'time', we use 'timestamp')
        const normalizedData = allData.map((item: any) => ({
          ...item,
          timestamp: item.time || item.timestamp, // Support both formats
          time: undefined, // Remove to avoid confusion
        }));
        
        // Filter data by date range di client side jika API tidak support
        const filteredData = normalizedData.filter((reading: any) => {
          const readingDate = new Date(reading.timestamp);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return readingDate >= start && readingDate <= end;
        });
        
        console.log(`📊 Filtered ${filteredData.length} records from ${normalizedData.length} total records`);
        
        return {
          success: true,
          data: filteredData,
        };
      } else {
        return {
          success: false,
          error: responseData.message || 'Unknown error from API',
        };
      }
    } catch (error) {
      console.error('❌ Error fetching temperature data by date range:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Mengambil rata-rata temperature
   */
  async getAverageTemperature(): Promise<number | null> {
    try {
      const response = await this.getLatestTemperature();
      
      if (response.success && response.data && response.data.length > 0) {
        const sum = response.data.reduce((acc, reading) => acc + reading.temperature, 0);
        return sum / response.data.length;
      }
      
      return null;
    } catch (error) {
      console.error('Error calculating average temperature:', error);
      return null;
    }
  }
}

// Export singleton instance
export const temperatureService = new TemperatureService();
