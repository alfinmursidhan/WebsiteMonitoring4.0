import { useState, useEffect, useCallback } from 'react';
import { influxService } from '../services/influxService';
import type { SensorReading, HistoricalData, SoilHealth, WeatherData } from '../types/monitoring';

// Custom hook for latest sensor readings
export const useSensorData = () => {
  const [data, setData] = useState<SensorReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await influxService.getLatestReadings();
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch sensor data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Set up polling for real-time data (every 30 seconds)
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Custom hook for historical data
export const useHistoricalData = (
  startTime: string,
  endTime: string,
  aggregation: 'raw' | 'hourly' | 'daily' = 'hourly'
) => {
  const [data, setData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await influxService.getHistoricalData(startTime, endTime, aggregation);
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch historical data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [startTime, endTime, aggregation]);

  useEffect(() => {
    if (startTime && endTime) {
      fetchData();
    }
  }, [startTime, endTime, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Custom hook for soil health data
export const useSoilHealth = () => {
  const [data, setData] = useState<SoilHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await influxService.getSoilHealth();
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch soil health data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 5 minutes for soil health updates
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Custom hook for weather data
export const useWeatherData = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await influxService.getWeatherData();
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch weather data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Poll every 10 minutes for weather updates
    const interval = setInterval(fetchData, 600000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchData };
};