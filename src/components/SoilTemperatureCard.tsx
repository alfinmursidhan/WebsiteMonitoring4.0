import { Card } from './index';
import { useSoilTemperature } from '../hooks/useSoilTemperature';

interface SoilTemperatureCardProps {
  className?: string;
}

export const SoilTemperatureCard = ({ className = '' }: SoilTemperatureCardProps) => {
  const { latestTemperature, loading, error, refetch } = useSoilTemperature(30000); // Update setiap 30 detik

  const getTemperatureStatus = (temp: number | null): { status: string; color: string } => {
    if (temp === null) return { status: 'Unknown', color: 'gray' };
    
    if (temp < 15) return { status: 'Dingin', color: 'blue' };
    if (temp < 25) return { status: 'Optimal', color: 'green' };
    if (temp < 35) return { status: 'Hangat', color: 'yellow' };
    return { status: 'Panas', color: 'red' };
  };

  const tempStatus = getTemperatureStatus(latestTemperature);

  return (
    <Card className={`${className} bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-blue-200 shadow-lg`} padding="md">
      <div className="text-center">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-blue-800 text-lg">🌡️ Suhu Tanah Real-Time</h3>
          <button
            onClick={refetch}
            disabled={loading}
            className="text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors"
            title="Refresh data"
          >
            <svg 
              className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        </div>

        {loading && !latestTemperature ? (
          <div className="py-8">
            <div className="animate-pulse">
              <div className="h-16 bg-blue-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        ) : error ? (
          <div className="py-4">
            <div className="text-red-600 text-sm mb-2">❌ {error}</div>
            <button
              onClick={refetch}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Coba Lagi
            </button>
          </div>
        ) : latestTemperature === null ? (
          <div className="py-8">
            <div className="text-6xl mb-4">📭</div>
            <div className="text-gray-600 text-sm mb-2">
              Belum ada data temperature
            </div>
            <div className="text-gray-500 text-xs">
              API terhubung dengan sukses, menunggu data dari sensor...
            </div>
            <button
              onClick={refetch}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Cek Lagi
            </button>
          </div>
        ) : (
          <>
            <div className="text-5xl sm:text-6xl mb-2">
              {latestTemperature !== null ? (
                <span className="font-bold text-blue-600">
                  {latestTemperature.toFixed(1)}°C
                </span>
              ) : (
                <span className="text-gray-400">--°C</span>
              )}
            </div>

            <div className="text-blue-700 text-base sm:text-lg font-medium mb-4">
              Temperature Tanah
            </div>

            <div className="mt-4 px-4 py-2 bg-blue-200 rounded-full inline-block shadow-sm">
              <span className={`text-sm font-medium ${
                tempStatus.color === 'green' ? 'text-green-700' :
                tempStatus.color === 'blue' ? 'text-blue-700' :
                tempStatus.color === 'yellow' ? 'text-yellow-700' :
                tempStatus.color === 'red' ? 'text-red-700' :
                'text-gray-700'
              }`}>
                Status: {tempStatus.status}
              </span>
            </div>

            <div className="mt-4 text-xs text-blue-600 opacity-75">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Data diperbarui otomatis setiap 30 detik
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
