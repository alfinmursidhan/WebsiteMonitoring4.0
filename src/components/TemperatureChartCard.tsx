import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import type { TemperatureReading } from '../services/temperatureService';
import Card from './Card';

interface TemperatureChartCardProps {
  data: TemperatureReading[];
  title?: string;
  className?: string;
}

type ChartType = 'line' | 'area' | 'bar';
type TimeRange = 'all' | '24h' | '12h' | '6h' | '1h';

export const TemperatureChartCard = ({ 
  data = [],  // Default to empty array
  title = '📈 Grafik Temperature',
  className = ''
}: TemperatureChartCardProps) => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [showAverage, setShowAverage] = useState(true);

  // Safety check untuk data
  if (!data) {
    console.error('TemperatureChartCard: data is undefined or null');
    return null;
  }

  // Filter data berdasarkan time range
  const getFilteredData = () => {
    if (timeRange === 'all' || !data.length) return data;

    const now = new Date();
    const hours = timeRange === '24h' ? 24 : 
                  timeRange === '12h' ? 12 : 
                  timeRange === '6h' ? 6 : 1;
    
    const cutoffTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
    
    return data.filter(reading => 
      reading.timestamp && new Date(reading.timestamp) >= cutoffTime
    );
  };

  const filteredData = getFilteredData();

  // Format data untuk chart dengan safety checks
  const chartData = filteredData && Array.isArray(filteredData) ? filteredData.map((reading) => {
    try {
      return {
        ...reading,
        time: reading.timestamp ? new Date(reading.timestamp).toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }) : '',
        date: reading.timestamp ? new Date(reading.timestamp).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
        }) : '',
        fullDate: reading.timestamp ? new Date(reading.timestamp).toLocaleString('id-ID') : '',
        temp: Number(reading.temperature.toFixed(1)),
      };
    } catch (error) {
      console.error('Error formatting temperature reading:', error, reading);
      return null;
    }
  }).filter(Boolean).reverse() : []; // Reverse agar data terbaru di kanan

  // Hitung statistik dengan safety check
  const stats = chartData && chartData.length > 0 ? {
    min: Math.min(...chartData.map(d => d?.temp || 0)),
    max: Math.max(...chartData.map(d => d?.temp || 0)),
    avg: chartData.reduce((sum, d) => sum + (d?.temp || 0), 0) / chartData.length,
  } : null;

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-blue-300">
          <p className="text-xs text-gray-500 mb-1">
            {data.fullDate}
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {data.temp}°C
          </p>
          {data.location && (
            <p className="text-xs text-gray-600">
              📍 {data.location}
            </p>
          )}
          {data.sensorId && (
            <p className="text-xs text-gray-500">
              🔌 Sensor: {data.sensorId}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="text-5xl mb-3">📊</div>
            <p className="text-gray-600 font-medium">Belum ada data temperature</p>
            <p className="text-sm text-gray-400 mt-2">Grafik akan muncul setelah sensor mengirim data</p>
          </div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    const commonAxisProps = {
      xAxis: {
        dataKey: "time",
        stroke: "#6b7280",
        style: { fontSize: '11px' },
        angle: -45,
        textAnchor: "end" as const,
        height: 70,
      },
      yAxis: {
        stroke: "#6b7280",
        style: { fontSize: '11px' },
        domain: ['dataMin - 2', 'dataMax + 2'],
      },
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {showAverage && stats && (
              <ReferenceLine 
                y={stats.avg} 
                stroke="#ef4444" 
                strokeDasharray="3 3"
                label={{ value: `Avg: ${stats.avg.toFixed(1)}°C`, position: 'right', fill: '#ef4444', fontSize: 12 }}
              />
            )}
            <Area
              type="monotone"
              dataKey="temp"
              name="Temperature (°C)"
              stroke="#3b82f6"
              fill="url(#colorTemp)"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              activeDot={{ r: 5, fill: '#1e40af' }}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {showAverage && stats && (
              <ReferenceLine 
                y={stats.avg} 
                stroke="#ef4444" 
                strokeDasharray="3 3"
                label={{ value: `Avg: ${stats.avg.toFixed(1)}°C`, position: 'right', fill: '#ef4444', fontSize: 12 }}
              />
            )}
            <Bar 
              dataKey="temp" 
              name="Temperature (°C)"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis {...commonAxisProps.xAxis} />
            <YAxis {...commonAxisProps.yAxis} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {showAverage && stats && (
              <ReferenceLine 
                y={stats.avg} 
                stroke="#ef4444" 
                strokeDasharray="3 3"
                label={{ value: `Avg: ${stats.avg.toFixed(1)}°C`, position: 'right', fill: '#ef4444', fontSize: 12 }}
              />
            )}
            <Line
              type="monotone"
              dataKey="temp"
              name="Temperature (°C)"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 7, fill: '#1e40af' }}
            />
          </LineChart>
        );
    }
  };

  return (
    <Card className={className}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {/* Chart Type Selector */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                chartType === 'line' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              📈 Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                chartType === 'area' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 Area
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                chartType === 'bar' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 Bar
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(['all', '24h', '12h', '6h', '1h'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  timeRange === range 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range === 'all' ? 'Semua' : range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Show Average Toggle */}
          <button
            onClick={() => setShowAverage(!showAverage)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              showAverage 
                ? 'bg-red-500 text-white shadow-sm' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Toggle garis rata-rata"
          >
            {showAverage ? '✓ Avg' : 'Avg'}
          </button>
        </div>
      </div>

      {/* Statistics */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">📉 Minimum</p>
            <p className="text-lg font-bold text-blue-800">{stats.min.toFixed(1)}°C</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-green-600 mb-1">📊 Rata-rata</p>
            <p className="text-lg font-bold text-green-800">{stats.avg.toFixed(1)}°C</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="text-xs text-red-600 mb-1">📈 Maximum</p>
            <p className="text-lg font-bold text-red-800">{stats.max.toFixed(1)}°C</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Data Count Info */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
        <span>📊 Total data points: {chartData.length}</span>
        {timeRange !== 'all' && (
          <span>🕐 Menampilkan data {timeRange}</span>
        )}
      </div>
    </Card>
  );
};
