import React, { useEffect, useState } from 'react';
import Card from './Card';
import { tuyaService } from '../services/tuyaService';

interface ElectricalData {
  voltage: number;
  current: number;
  power: number;
  energy: number;
  deviceName?: string;
  timestamp: string;
}

const ElectricalDataCard: React.FC = () => {
  const [data, setData] = useState<ElectricalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchElectricalData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await tuyaService.getElectricalData();
      
      if (result) {
        setData(result);
        setLastUpdate(new Date().toLocaleTimeString('id-ID'));
        setError(null);
      } else {
        setError('Tidak ada data');
      }
    } catch (err) {
      console.error('Error fetching electrical data:', err);
      setError(err instanceof Error ? err.message : 'Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectricalData();
    const interval = setInterval(fetchElectricalData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !data) {
    return (
      <Card className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-200">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data listrik...</p>
        </div>
      </Card>
    );
  }

  if (error && !data) {
    return (
      <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 border-red-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
            <span>⚡</span> Data Listrik MCB
          </h3>
        </div>
        <div className="text-center py-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchElectricalData}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-yellow-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-yellow-800 flex items-center gap-2 mb-1">
            <span className="text-2xl">⚡</span> Data Listrik MCB
          </h3>
          {data?.deviceName && (
            <p className="text-sm text-yellow-600">{data.deviceName}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          )}
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {data ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">V</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Tegangan</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {data.voltage.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500">Volt</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Arus</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {data.current.toFixed(3)}
              </div>
              <div className="text-xs text-gray-500">Ampere</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">W</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Daya</span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {data.power.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">Watt</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">E</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">Energi Total</span>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {data.energy.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">kWh</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-yellow-200">
            <div className="text-xs text-gray-500">
              Update terakhir: {lastUpdate}
            </div>
            <button
              onClick={fetchElectricalData}
              disabled={loading}
              className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? 'Memuat...' : 'Refresh'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-4 text-gray-500">
          Tidak ada data tersedia
        </div>
      )}
    </Card>
  );
};

export default ElectricalDataCard;
