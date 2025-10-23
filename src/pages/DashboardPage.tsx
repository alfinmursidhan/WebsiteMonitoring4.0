import { useState } from 'react';
import { Sidebar, Card, SoilTemperatureCard, TemperatureChartCard, ElectricalDataCard } from '../components';
import { useAuth } from '../hooks/useAuth';
import { useSoilTemperatureHistory } from '../hooks/useSoilTemperature';

const DashboardPage = () => {
  const { user } = useAuth();

  // Fetch historical temperature data untuk chart (24 jam terakhir)
  const [dateRange] = useState({
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date().toISOString(),
  });

  const { data: historyData, loading: historyLoading, error: historyError } = useSoilTemperatureHistory(
    dateRange.startDate, 
    dateRange.endDate
  );

  // Debug log
  console.log('📊 Dashboard - History Data:', historyData);
  console.log('📊 Dashboard - Data length:', historyData?.length);
  console.log('⏳ Dashboard - Loading:', historyLoading);
  console.log('❌ Dashboard - Error:', historyError);

  // Gunakan data historical jika ada, jika tidak gunakan mock data untuk demo
  const generateMockData = () => {
    const now = new Date();
    const mockData = [];
    for (let i = 24; i >= 0; i--) {
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

  const chartData = (historyData && historyData.length > 0) ? historyData : generateMockData();

  // Mock data for monitoring
  const weatherData = {
    temperature: 24,
    humidity: 52,
    soilMoisture: 22,
    nitrogen: 12,
    phosphorus: 52,
    potassium: 22,
    soilHealth: 170,
  };

  const stats = [
    { icon: '🌡️', value: '4', label: 'Angin berasa', sublabel: 'Tenang (4)' },
    { icon: '💧', value: '7', label: 'Tingkat air', sublabel: 'Sesuai' },
    { icon: '🌱', value: '8.5', label: 'Suhu tanah', sublabel: 'Baik perkera' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang, {user?.fullName || 'Admin'}!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Dashboard monitoring sistem tanah real-time
            </p>
          </div>

          {/* Notification Banner */}
          <Card className="bg-green-50 border-green-200 mb-6 sm:mb-8" padding="sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">Data Berhasil Disimpan</span>
            </div>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Weather Card */}
            <div className="lg:col-span-2">
              <Card className="h-full" gradient="orange-warm" padding="md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="text-white">
                    <h3 className="text-lg sm:text-xl opacity-90 font-semibold mb-1">Pantai Air Negeri Simpang</h3>
                    <p className="text-sm opacity-75">Selasa, 07 Oktober 2025 14:45</p>
                  </div>
                  <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm hover:bg-white/30 transition-all duration-200 self-start sm:self-auto">
                    Lihat Detail
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
                  <div className="text-4xl sm:text-5xl font-bold text-white">{weatherData.temperature}°C</div>
                  <div className="text-white opacity-90">
                    <div className="text-lg mb-1 flex items-center gap-2">
                      <span>☁️</span> 
                      <span>Berawan</span>
                    </div>
                    <div className="text-sm opacity-75">Kondisi Cuaca</div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl sm:text-2xl">{stat.icon}</span>
                      </div>
                      <div className="text-white text-lg sm:text-xl font-semibold mb-1">{stat.value}</div>
                      <div className="text-white/80 text-xs sm:text-sm font-medium">{stat.label}</div>
                      <div className="text-white/70 text-xs">{stat.sublabel}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Soil Health Card */}
            <div>
              <Card className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 h-full border-emerald-200 shadow-lg" padding="md">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl mb-4">🌱</div>
                  <h3 className="font-semibold text-emerald-800 mb-4 text-lg">Kesehatan Tanah</h3>
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">{weatherData.soilHealth}</div>
                  <div className="text-emerald-700 text-base sm:text-lg font-medium">mg/kg</div>
                  <div className="mt-4 px-3 py-1 bg-emerald-200 rounded-full inline-block shadow-sm">
                    <span className="text-sm text-emerald-700 font-medium">Status: Sangat Baik</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Monitoring Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 sm:mb-8">
            {/* Temperature Card - Real-time Data */}
            <SoilTemperatureCard />
            
            {/* Electrical Card - Real-time Data */}
            <ElectricalDataCard />
          </div>

          {/* Temperature Chart - Historical Data */}
          {!historyLoading && chartData && chartData.length > 0 ? (
            <div className="mb-6 sm:mb-8">
              <TemperatureChartCard 
                data={chartData} 
                title="📈 Grafik Temperature 24 Jam Terakhir"
              />
            </div>
          ) : historyLoading ? (
            <Card className="mb-6 sm:mb-8">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat data chart...</p>
              </div>
            </Card>
          ) : null}

          {/* Nutrient Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 border-rose-200 hover:shadow-lg transition-all duration-300" padding="md">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">{weatherData.nitrogen}</div>
                <div className="text-red-700 font-semibold mb-1">Nitrogen (N)</div>
                <div className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">ppm</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-sky-200 hover:shadow-lg transition-all duration-300" padding="md">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{weatherData.phosphorus}</div>
                <div className="text-blue-700 font-semibold mb-1">Fosfor (P)</div>
                <div className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block">ppm</div>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 border-teal-200 hover:shadow-lg transition-all duration-300 sm:col-span-2 md:col-span-1" padding="md">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">{weatherData.potassium}</div>
                <div className="text-teal-700 font-semibold mb-1">Kalium (K)</div>
                <div className="text-sm text-teal-600 bg-teal-100 px-2 py-1 rounded-full inline-block">ppm</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;