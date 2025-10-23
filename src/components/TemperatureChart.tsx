import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TemperatureReading } from '../services/temperatureService';

interface TemperatureChartProps {
  data: TemperatureReading[];
  type?: 'line' | 'area';
  height?: number;
  showGrid?: boolean;
}

export const TemperatureChart = ({ 
  data, 
  type = 'line', 
  height = 300,
  showGrid = true 
}: TemperatureChartProps) => {
  
  // Format data untuk chart
  const chartData = data.map((reading) => ({
    ...reading,
    time: reading.timestamp ? new Date(reading.timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }) : '',
    date: reading.timestamp ? new Date(reading.timestamp).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
    }) : '',
    temp: Number(reading.temperature.toFixed(1)),
  })).reverse(); // Reverse agar data terbaru di kanan

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-800">
            {data.date} - {data.time}
          </p>
          <p className="text-lg font-bold text-blue-600">
            {data.temp}°C
          </p>
          {data.location && (
            <p className="text-xs text-gray-600">
              📍 {data.location}
            </p>
          )}
          {data.sensorId && (
            <p className="text-xs text-gray-500">
              Sensor: {data.sensorId}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500">Belum ada data untuk ditampilkan</p>
          <p className="text-xs text-gray-400 mt-1">Data akan muncul setelah sensor mengirim informasi</p>
        </div>
      </div>
    );
  }

  const ChartComponent = type === 'area' ? AreaChart : LineChart;
  const DataComponent = type === 'area' ? Area : Line;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="line"
          />
          <DataComponent
            type="monotone"
            dataKey="temp"
            name="Temperature (°C)"
            stroke="#2563eb"
            fill={type === 'area' ? 'url(#colorTemp)' : undefined}
            strokeWidth={3}
            dot={{ fill: '#2563eb', r: 4 }}
            activeDot={{ r: 6, fill: '#1e40af' }}
          />
          {type === 'area' && (
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};
