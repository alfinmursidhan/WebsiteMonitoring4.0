import { useState, useEffect, useCallback } from 'react';
import { temperatureService } from '../services/temperatureService';
import type { TemperatureReading } from '../services/temperatureService';

/**
 * Custom hook untuk mengambil data temperature tanah real-time
 */
export const useSoilTemperature = (pollingInterval: number = 30000) => {
  const [data, setData] = useState<TemperatureReading[]>([]);
  const [latestTemperature, setLatestTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemperature = useCallback(async () => {
    try {
      setLoading(true);
      const response = await temperatureService.getLatestTemperature();
      
      if (response.success && response.data) {
        setData(response.data);
        // Ambil temperature terbaru (asumsi data sudah diurutkan atau ambil yang pertama)
        if (response.data.length > 0) {
          const latest = response.data[response.data.length - 1];
          setLatestTemperature(latest.temperature);
        }
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch temperature data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error in useSoilTemperature:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch data pertama kali
    fetchTemperature();

    // Set up polling untuk update data secara berkala
    if (pollingInterval > 0) {
      const interval = setInterval(fetchTemperature, pollingInterval);
      return () => clearInterval(interval);
    }
  }, [fetchTemperature, pollingInterval]);

  return {
    data,
    latestTemperature,
    loading,
    error,
    refetch: fetchTemperature,
  };
};

/**
 * Custom hook untuk mengambil data temperature dengan range waktu
 */
export const useSoilTemperatureHistory = (startDate: string, endDate: string) => {
  const [data, setData] = useState<TemperatureReading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!startDate || !endDate) {
      setError('Start date and end date are required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await temperatureService.getTemperatureByDateRange(startDate, endDate);
      
      if (response.success && response.data) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch temperature history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error in useSoilTemperatureHistory:', err);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    data,
    loading,
    error,
    refetch: fetchHistory,
  };
};

/**
 * Custom hook untuk menghitung rata-rata temperature
 */
export const useAverageSoilTemperature = () => {
  const [average, setAverage] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAverage = useCallback(async () => {
    try {
      setLoading(true);
      const avg = await temperatureService.getAverageTemperature();
      setAverage(avg);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('Error in useAverageSoilTemperature:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAverage();
  }, [fetchAverage]);

  return {
    average,
    loading,
    error,
    refetch: fetchAverage,
  };
};
