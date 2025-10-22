// Types for monitoring data from InfluxDB
export interface SensorReading {
  time: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  location?: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  timestamp: string;
}

export interface SoilHealth {
  ph: number;
  nutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  moisture: number;
  temperature: number;
  conductivity: number;
  timestamp: string;
}

export interface HistoricalData {
  readings: SensorReading[];
  timeRange: {
    start: string;
    end: string;
  };
  aggregation?: 'raw' | 'hourly' | 'daily' | 'weekly';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Types for real-time soil temperature data
export interface SoilTemperatureData {
  id?: string;
  temperature: number;
  timestamp: string;
  location?: string;
  sensorId?: string;
}

export interface SoilTemperatureResponse {
  success: boolean;
  data?: SoilTemperatureData[];
  error?: string;
  message?: string;
}