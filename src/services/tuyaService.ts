import { API_CONFIG, getTuyaApiHeaders } from '../config/api';

// Interface untuk Tuya API Response
export interface TuyaTokenResponse {
  result: {
    access_token: string;
    expire_time: number;
    refresh_token: string;
    uid: string;
  };
  success: boolean;
  t: number;
  tid: string;
}

export interface TuyaDeviceStatus {
  code: string;
  value: any;
}

export interface TuyaDeviceInfo {
  active_time: number;
  biz_type: number;
  category: string;
  create_time: number;
  icon: string;
  id: string;
  ip: string;
  lat: string;
  local_key: string;
  lon: string;
  name: string;
  online: boolean;
  owner_id: string;
  product_id: string;
  product_name: string;
  status: TuyaDeviceStatus[];
  sub: boolean;
  time_zone: string;
  uid: string;
  update_time: number;
  uuid: string;
}

export interface ElectricalData {
  timestamp: string;
  voltage: number; // V
  current: number; // A
  power: number;   // W
  energy: number;  // kWh
  deviceId: string;
  deviceName: string;
}

class TuyaService {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  // Mendapatkan access token dari Tuya API
  private async getAccessToken(): Promise<string> {
    // Jika token masih valid, gunakan yang ada
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      console.log('🔑 Using cached access token');
      return this.accessToken;
    }

    console.log('🔑 Getting new access token from Tuya API...');
    console.log('📋 Config:', {
      BASE_URL: API_CONFIG.TUYA_API.BASE_URL,
      CLIENT_ID: API_CONFIG.TUYA_API.CLIENT_ID,
      DEVICE_ID: API_CONFIG.TUYA_API.DEVICE_ID
    });

    try {
      const timestamp = Date.now().toString();
      const nonce = this.generateNonce();
      
      const headers = {
        ...getTuyaApiHeaders(),
        'client_id': API_CONFIG.TUYA_API.CLIENT_ID,
        'sign_method': 'HMAC-SHA256',
        't': timestamp,
        'nonce': nonce,
        'sign': '' // Will be set below
      };
      
      // Generate signature dengan headers yang lengkap
      headers.sign = await this.generateSignature('GET', '/v1.0/token?grant_type=1', headers);
      
      console.log('📤 Request headers:', headers);
      
      const response = await fetch(`${API_CONFIG.TUYA_API.BASE_URL}/v1.0/token?grant_type=1`, {
        method: 'GET',
        headers: headers,
      });

      console.log('📥 Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data: TuyaTokenResponse = await response.json();
      console.log('📥 Token response:', data);
      
      if (data.success) {
        this.accessToken = data.result.access_token;
        this.tokenExpiry = Date.now() + (data.result.expire_time * 1000);
        console.log('✅ Access token obtained successfully');
        return this.accessToken;
      } else {
        console.error('❌ Token response not successful:', data);
        throw new Error('Failed to get access token from Tuya API');
      }
    } catch (error) {
      console.error('❌ Error getting Tuya access token:', error);
      throw error;
    }
  }

  // Generate nonce untuk signature
  private generateNonce(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Generate proper Tuya API signature menggunakan HMAC-SHA256
  private async generateSignature(method: string, url: string, headers: Record<string, string>, body: string = ''): Promise<string> {
    try {
      const timestamp = headers.t;
      const nonce = headers.nonce;
      const clientId = headers.client_id;
      const accessToken = headers.access_token || '';
      
      // Hash body content using Web Crypto API
      const encoder = new TextEncoder();
      const bodyBuffer = encoder.encode(body);
      const hashBuffer = await crypto.subtle.digest('SHA-256', bodyBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const bodyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Tuya API v2.0 signature format:
      // CLIENT_ID + ACCESS_TOKEN + TIMESTAMP + NONCE + METHOD + "\n" + BODY_HASH + "\n" + HEADERS + "\n" + URL
      const headersString = '';
      const stringToSign = clientId + accessToken + timestamp + nonce + 
        method.toUpperCase() + '\n' + bodyHash + '\n' + headersString + '\n' + url;
      
      console.log('🔐 Generating signature for:', {
        method,
        url, 
        clientId,
        timestamp,
        nonce,
        stringToSign: stringToSign.substring(0, 100) + '...'
      });
      
      // Generate HMAC-SHA256 signature using Web Crypto API
      const keyBuffer = encoder.encode(API_CONFIG.TUYA_API.CLIENT_SECRET);
      const key = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signBuffer = encoder.encode(stringToSign);
      const signature = await crypto.subtle.sign('HMAC', key, signBuffer);
      const signatureArray = Array.from(new Uint8Array(signature));
      const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      
      return signatureHex;
      
    } catch (error) {
      console.error('❌ Error generating signature:', error);
      throw new Error('Failed to generate API signature');
    }
  }

  // Mendapatkan informasi device
  async getDeviceInfo(deviceId?: string): Promise<TuyaDeviceInfo> {
    const token = await this.getAccessToken();
    const targetDeviceId = deviceId || API_CONFIG.TUYA_API.DEVICE_ID;

    try {
      const timestamp = Date.now().toString();
      const nonce = this.generateNonce();
      
      const headers = {
        ...getTuyaApiHeaders(token),
        'client_id': API_CONFIG.TUYA_API.CLIENT_ID,
        'sign_method': 'HMAC-SHA256',
        't': timestamp,
        'nonce': nonce,
        'sign': ''
      };
      
      headers.sign = await this.generateSignature('GET', `/v1.0/devices/${targetDeviceId}`, headers);

      const response = await fetch(
        `${API_CONFIG.TUYA_API.BASE_URL}/v1.0/devices/${targetDeviceId}`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching device info:', error);
      throw error;
    }
  }

  // Mendapatkan status real-time device (termasuk data kWh)
  async getDeviceStatus(deviceId?: string): Promise<TuyaDeviceStatus[]> {
    const token = await this.getAccessToken();
    const targetDeviceId = deviceId || API_CONFIG.TUYA_API.DEVICE_ID;

    try {
      const timestamp = Date.now().toString();
      const nonce = this.generateNonce();
      
      const headers = {
        ...getTuyaApiHeaders(token),
        'client_id': API_CONFIG.TUYA_API.CLIENT_ID,
        'sign_method': 'HMAC-SHA256',
        't': timestamp,
        'nonce': nonce,
        'sign': ''
      };
      
      headers.sign = await this.generateSignature('GET', `/v1.0/devices/${targetDeviceId}/status`, headers);

      const response = await fetch(
        `${API_CONFIG.TUYA_API.BASE_URL}/v1.0/devices/${targetDeviceId}/status`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching device status:', error);
      throw error;
    }
  }

  // Mengkonversi status device menjadi data electrical yang terstruktur
  async getElectricalData(deviceId?: string): Promise<ElectricalData | null> {
    try {
      console.log('🔌 Getting electrical data...');
      
      // Gunakan proxy server untuk bypass CORS
      const proxyUrl = 'http://localhost:3001/api/tuya/device/status';
      
      console.log('📡 Fetching from proxy:', proxyUrl);
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Proxy error:', errorText);
        throw new Error(`Proxy error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        console.log('✅ Electrical data received:', result.data);
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to get electrical data');
      }

    } catch (error) {
      console.error('❌ Error getting electrical data:', error);
      return null;
    }
  }

  // Mendapatkan historical data (jika tersedia)
  async getHistoricalData(
    deviceId?: string,
    startTime?: string,
    endTime?: string
  ): Promise<ElectricalData[]> {
    const token = await this.getAccessToken();
    const targetDeviceId = deviceId || API_CONFIG.TUYA_API.DEVICE_ID;
    
    // Default time range: last 24 hours
    const end = endTime ? new Date(endTime) : new Date();
    const start = startTime ? new Date(startTime) : new Date(end.getTime() - 24 * 60 * 60 * 1000);
    
    console.log(`📊 Getting historical data from ${start.toISOString()} to ${end.toISOString()}`);

    try {
      const timestamp = Date.now().toString();
      const nonce = this.generateNonce();
      
      const headers = {
        ...getTuyaApiHeaders(token),
        'client_id': API_CONFIG.TUYA_API.CLIENT_ID,
        'sign_method': 'HMAC-SHA256',
        't': timestamp,
        'nonce': nonce,
        'sign': ''
      };
      
      headers.sign = await this.generateSignature('GET', `/v1.0/devices/${targetDeviceId}/logs`, headers);

      const response = await fetch(
        `${API_CONFIG.TUYA_API.BASE_URL}/v1.0/devices/${targetDeviceId}/logs`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert logs to ElectricalData format
      // Note: Format ini mungkin perlu disesuaikan berdasarkan response actual dari API
      return data.result?.map((log: any) => ({
        timestamp: new Date(log.event_time).toISOString(),
        voltage: log.value?.voltage || 0,
        current: log.value?.current || 0,
        power: log.value?.power || 0,
        energy: log.value?.energy || 0,
        deviceId: targetDeviceId,
        deviceName: log.device_name || 'MCB Device',
      })) || [];
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  }

  // Mendapatkan list semua devices
  async getAllDevices(): Promise<TuyaDeviceInfo[]> {
    const token = await this.getAccessToken();
    
    try {
      console.log('🔍 Getting all devices...');
      
      const timestamp = Date.now().toString();
      const nonce = this.generateNonce();
      
      const headers = {
        ...getTuyaApiHeaders(token),
        'client_id': API_CONFIG.TUYA_API.CLIENT_ID,
        'sign_method': 'HMAC-SHA256',
        't': timestamp,
        'nonce': nonce,
        'sign': ''
      };
      
      headers.sign = await this.generateSignature('GET', `/v1.0/users/${API_CONFIG.TUYA_API.PROJECT_CODE}/devices`, headers);

      const response = await fetch(
        `${API_CONFIG.TUYA_API.BASE_URL}/v1.0/users/${API_CONFIG.TUYA_API.PROJECT_CODE}/devices`,
        {
          method: 'GET',
          headers: headers,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error fetching devices:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📱 Devices response:', data);
      
      if (data.success && data.result) {
        console.log('✅ Found devices:', data.result.length);
        return data.result;
      }
      
      return [];
    } catch (error) {
      console.error('❌ Error getting device list:', error);
      return [];
    }
  }

  // Auto-detect MCB device
  async autoDetectMCBDevice(): Promise<string | null> {
    try {
      const devices = await this.getAllDevices();
      
      console.log('🔍 Auto-detecting MCB device from', devices.length, 'devices');
      
      // Filter devices yang mungkin MCB
      const mcbDevices = devices.filter(device => 
        device.category === 'dlq' || 
        device.category === 'kg' ||
        device.category === 'cz' ||
        device.name.toLowerCase().includes('mcb') ||
        device.name.toLowerCase().includes('switch') ||
        device.name.toLowerCase().includes('breaker') ||
        device.product_name.toLowerCase().includes('mcb') ||
        device.product_name.toLowerCase().includes('switch')
      );
      
      console.log('⚡ Found potential MCB devices:', mcbDevices.map(d => ({
        id: d.id,
        name: d.name,
        category: d.category,
        product: d.product_name,
        online: d.online
      })));
      
      // Prioritas device yang online
      const onlineMCBs = mcbDevices.filter(d => d.online);
      
      if (onlineMCBs.length > 0) {
        console.log('✅ Using online MCB device:', onlineMCBs[0].id, '-', onlineMCBs[0].name);
        return onlineMCBs[0].id;
      }
      
      if (mcbDevices.length > 0) {
        console.log('⚠️ Using offline MCB device:', mcbDevices[0].id, '-', mcbDevices[0].name);
        return mcbDevices[0].id;
      }
      
      // Fallback: gunakan device pertama yang ada
      if (devices.length > 0) {
        console.log('🔄 No MCB devices found, using first available device:', devices[0].id);
        return devices[0].id;
      }
      
      console.log('❌ No devices found');
      return null;
    } catch (error) {
      console.error('❌ Error auto-detecting MCB device:', error);
      return null;
    }
  }

  // Test koneksi ke Tuya API
  async testConnection(): Promise<boolean> {
    try {
      const token = await this.getAccessToken();
      return !!token;
    } catch (error) {
      console.error('Tuya connection test failed:', error);
      return false;
    }
  }
}

// Singleton instance
export const tuyaService = new TuyaService();