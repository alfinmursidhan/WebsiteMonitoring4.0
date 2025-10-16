import React, { useState } from 'react';
import { Calendar, ChevronRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sidebar, Card, Button } from '../components';

interface HistoryEntry {
  id: string;
  date: string;
  time: string;
  temperature: number;
}

const HistoryPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('today');

  const historyEntries: HistoryEntry[] = [
    { id: '1', date: 'Hari Ini', time: '16:00', temperature: 24 },
    { id: '2', date: 'Kemarin', time: '20:00', temperature: 26 },
  ];

  // Sample data for charts
  const temperatureData = [
    { time: '00:00', temperature: 22 },
    { time: '04:00', temperature: 20 },
    { time: '08:00', temperature: 24 },
    { time: '12:00', temperature: 28 },
    { time: '16:00', temperature: 26 },
    { time: '20:00', temperature: 24 },
  ];

  const nutrientData = [
    { name: 'N', value: 12, color: '#EF4444' },
    { name: 'P', value: 52, color: '#3B82F6' },
    { name: 'K', value: 22, color: '#06B6D4' },
  ];

  const stats = [
    { icon: '🌡️', value: '4', label: 'Angin berasa', sublabel: 'Tenang (4)' },
    { icon: '💧', value: '7', label: 'Tingkat air', sublabel: 'Sesuai' },
    { icon: '🌱', value: '8.5', label: 'Suhu tanah', sublabel: 'Baik perkera' },
  ];

  const DetailView = () => (
    <div className="p-4 sm:p-6">
      {/* Date Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          size="sm"
          variant={selectedDate === 'today' ? 'primary' : 'secondary'}
          onClick={() => setSelectedDate('today')}
        >
          Hari Ini
        </Button>
        <Button
          size="sm"
          variant={selectedDate === 'yesterday' ? 'primary' : 'secondary'}
          onClick={() => setSelectedDate('yesterday')}
        >
          Kemarin
        </Button>
        <Button
          size="sm"
          variant={selectedDate === 'week' ? 'primary' : 'secondary'}
          onClick={() => setSelectedDate('week')}
        >
          Minggu Ini
        </Button>
      </div>

      {/* Current Stats */}
      <Card className="mb-6" gradient padding="md">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white">
            <h3 className="text-sm opacity-90">Selasa, 07 Oktober 2025 14:45</h3>
            <p className="text-xs opacity-75">Data terbaru sensor</p>
          </div>
          <button className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
            Lihat Detail
          </button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-4xl font-bold text-white">24°C</div>
          <div className="text-white opacity-90">
            <div className="text-xs mb-1">☁️ Berawan</div>
            <div className="text-xs">Temperatur</div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-white text-lg font-semibold">{stat.value}</div>
              <div className="text-white/80 text-xs">{stat.label}</div>
              <div className="text-white/70 text-xs">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Temperature Chart */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Suhu Harian</h3>
          <TrendingUp className="text-orange" size={20} />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#FF9500"
                strokeWidth={3}
                dot={{ fill: '#FF9500', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Nutrient Chart */}
      <Card className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Kandungan Nutrisi</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nutrientData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {nutrientData.map((entry, index) => (
                  <Bar key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {nutrientData.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`w-4 h-4 rounded mx-auto mb-1`} style={{ backgroundColor: item.color }}></div>
              <div className="text-sm font-semibold">{item.value}</div>
              <div className="text-xs text-gray-600">{item.name === 'N' ? 'Nitrogen' : item.name === 'P' ? 'Fosfor' : 'Kalium'}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Soil Health */}
      <Card className="bg-green-100" padding="md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-800">Kesehatan tanah (mg/kg)</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-3xl font-bold text-green-600">170</div>
              <div className="text-green-700">mg/kg</div>
            </div>
          </div>
          <div className="text-4xl">🌱</div>
        </div>
      </Card>
    </div>
  );

  const ListView = () => (
    <div className="px-4 py-4">
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          Dapatkan pembersihan sistem secara rutin dan rekam riwayat penggunaan di halaman ini.
        </p>
      </div>

      <div className="space-y-3">
        {historyEntries.map((entry) => (
          <Card
            key={entry.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setSelectedDate('detail')}
            padding="sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                  <Calendar size={20} className="text-orange" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{entry.date}</h3>
                  <p className="text-sm text-gray-600">{entry.time} - Selesai {new Date().getDate()} Oktober 2025</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">History</h1>
            <p className="text-gray-600 text-sm sm:text-base">Riwayat data monitoring sistem tanah</p>
          </div>
          {selectedDate === 'detail' ? <DetailView /> : <ListView />}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;