import { Sidebar, Card, TemperatureChartCard } from '../components';
import { useSoilTemperature, useSoilTemperatureHistory } from '../hooks/useSoilTemperature';
import { useState } from 'react';

const TemperaturePage = () => {
  const { data, latestTemperature, loading, error, refetch } = useSoilTemperature(30000);
  
  // Setup date range untuk historical data (7 hari terakhir)
  const [dateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
  });

  const { 
    data: historyData, 
    loading: historyLoading,
    error: historyError 
  } = useSoilTemperatureHistory(dateRange.startDate, dateRange.endDate);

  // Debug log
  console.log('🌡️ Temperature Page - History Data:', historyData);
  console.log('🌡️ Temperature Page - Data length:', historyData?.length);
  console.log('⏳ Temperature Page - Loading:', historyLoading);
  console.log('❌ Temperature Page - Error:', historyError);

  // Generate mock data untuk demo jika tidak ada data historical
  const generateMockData = () => {
    const now = new Date();
    const mockData = [];
    for (let i = 168; i >= 0; i -= 4) { // Data setiap 4 jam untuk 7 hari
      const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
      mockData.push({
        id: `mock-${i}`,
        temperature: 20 + Math.random() * 10,
        timestamp: timestamp.toISOString(),
        location: 'Sensor-01',
        sensorId: 'MOCK-SENSOR'
      });
    }
    return mockData;
  };

  // Gunakan data real jika ada, jika tidak gunakan mock
  const chartData = (historyData && historyData.length > 0) ? historyData : generateMockData();

  // Fungsi untuk mendapatkan status temperature
  const getTemperatureStatus = (temp: number | null) => {
    if (temp === null) return { status: 'Unknown', color: 'gray', icon: '❓' };
    
    if (temp < 15) return { status: 'Dingin', color: 'blue', icon: '❄️' };
    if (temp < 25) return { status: 'Optimal', color: 'green', icon: '✅' };
    if (temp < 35) return { status: 'Hangat', color: 'yellow', icon: '⚠️' };
    return { status: 'Panas', color: 'red', icon: '🔥' };
  };

  const tempStatus = getTemperatureStatus(latestTemperature);

  // Hitung statistik dari data history
  const calculateStats = () => {
    const dataToUse = chartData && chartData.length > 0 ? chartData : [];
    if (dataToUse.length === 0) {
      return { min: 0, max: 0, avg: 0 };
    }

    const temps = dataToUse.map(d => d.temperature);
    return {
      min: Math.min(...temps),
      max: Math.max(...temps),
      avg: temps.reduce((a, b) => a + b, 0) / temps.length,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              🌡️ Monitoring Suhu Tanah Real-Time
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Data temperature tanah dari sensor IoT
            </p>
          </div>

          {/* Main Temperature Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Current Temperature */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-cyan-600 text-white" padding="lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Temperature Saat Ini</h2>
                  <p className="text-sm opacity-80">Update otomatis setiap 30 detik</p>
                </div>
                <button
                  onClick={refetch}
                  disabled={loading}
                  className="bg-white/20 hover:bg-white/30 disabled:opacity-50 p-2 rounded-lg transition-colors"
                  title="Refresh data"
                >
                  <svg 
                    className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} 
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
                <div className="text-center py-12">
                  <div className="animate-pulse">
                    <div className="h-24 bg-white/20 rounded-lg mb-4"></div>
                    <div className="h-6 bg-white/20 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-200 mb-4">❌ {error}</div>
                  <button
                    onClick={refetch}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    Coba Lagi
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-7xl sm:text-8xl font-bold mb-4">
                    {latestTemperature?.toFixed(1)}°C
                  </div>
                  <div className="flex items-center justify-center gap-3 text-xl">
                    <span className="text-4xl">{tempStatus.icon}</span>
                    <span>Status: {tempStatus.status}</span>
                  </div>
                  {data && data.length > 0 && (
                    <div className="mt-6 text-sm opacity-80">
                      <p>Lokasi: {data[0].location || 'Sensor-01'}</p>
                      <p>Update: {data[0].timestamp ? new Date(data[0].timestamp).toLocaleString('id-ID') : 'N/A'}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Statistics */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white" padding="md">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-3xl font-bold mb-1">{stats.avg.toFixed(1)}°C</div>
                  <div className="text-sm opacity-90">Rata-rata (7 hari)</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-orange-600 text-white" padding="md">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <div className="text-3xl font-bold mb-1">{stats.max.toFixed(1)}°C</div>
                  <div className="text-sm opacity-90">Maximum</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white" padding="md">
                <div className="text-center">
                  <div className="text-4xl mb-2">❄️</div>
                  <div className="text-3xl font-bold mb-1">{stats.min.toFixed(1)}°C</div>
                  <div className="text-sm opacity-90">Minimum</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Temperature Chart */}
          {chartData && chartData.length > 0 && (
            <div className="mb-6">
              <TemperatureChartCard 
                data={chartData} 
                title="📈 Grafik Temperature 7 Hari Terakhir"
              />
            </div>
          )}

          {/* Historical Data Table */}
          <Card className="bg-white" padding="lg">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Riwayat Data Temperature</h3>
              <p className="text-gray-600 text-sm">Data 7 hari terakhir</p>
            </div>

            {historyLoading ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : historyError ? (
              <div className="text-center py-12 text-red-600">
                <p>❌ {historyError}</p>
              </div>
            ) : historyData && historyData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Waktu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Temperature
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lokasi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {historyData.slice(-20).reverse().map((reading, index) => {
                      const status = getTemperatureStatus(reading.temperature);
                      return (
                        <tr key={reading.id || index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {reading.timestamp ? new Date(reading.timestamp).toLocaleString('id-ID') : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-lg font-semibold text-gray-900">
                              {reading.temperature.toFixed(1)}°C
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                              status.color === 'green' ? 'bg-green-100 text-green-800' :
                              status.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                              status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                              status.color === 'red' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {status.icon} {status.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {reading.location || reading.sensorId || 'Sensor-01'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Tidak ada data historical tersedia</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TemperaturePage;
