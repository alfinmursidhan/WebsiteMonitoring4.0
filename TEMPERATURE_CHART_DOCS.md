# 📊 Temperature Chart Documentation

## Overview
Dokumentasi ini menjelaskan implementasi chart untuk visualisasi data temperature tanah menggunakan library Recharts.

## 🎨 Komponen Chart

### 1. **TemperatureChart** (Basic Chart)
Komponen chart dasar dengan fitur minimal.

#### Props:
```typescript
interface TemperatureChartProps {
  data: TemperatureReading[];  // Array data temperature
  type?: 'line' | 'area';      // Tipe chart (default: 'line')
  height?: number;             // Tinggi chart (default: 300px)
  showGrid?: boolean;          // Tampilkan grid (default: true)
}
```

#### Penggunaan:
```tsx
import { TemperatureChart } from '../components';

<TemperatureChart 
  data={temperatureData} 
  type="line"
  height={400}
  showGrid={true}
/>
```

#### Fitur:
- ✅ Line Chart / Area Chart
- ✅ Custom Tooltip dengan informasi detail
- ✅ Responsive design
- ✅ Empty state ketika tidak ada data
- ✅ Gradient fill untuk Area Chart

---

### 2. **TemperatureChartCard** (Advanced Chart)
Komponen chart lengkap dengan banyak fitur interaktif.

#### Props:
```typescript
interface TemperatureChartCardProps {
  data: TemperatureReading[];  // Array data temperature
  title?: string;              // Judul chart (default: '📈 Grafik Temperature')
  className?: string;          // Custom className
}
```

#### Penggunaan:
```tsx
import { TemperatureChartCard } from '../components';

<TemperatureChartCard 
  data={temperatureData} 
  title="📈 Grafik Temperature 24 Jam"
/>
```

#### Fitur Lengkap:

##### 1. **Multiple Chart Types**
Pengguna dapat beralih antara 3 tipe chart:
- 📈 **Line Chart** - Untuk melihat trend
- 📊 **Area Chart** - Untuk melihat volume data
- 📊 **Bar Chart** - Untuk perbandingan data point

##### 2. **Time Range Filter**
Filter data berdasarkan rentang waktu:
- **All** - Semua data
- **24h** - 24 jam terakhir
- **12h** - 12 jam terakhir
- **6h** - 6 jam terakhir
- **1h** - 1 jam terakhir

##### 3. **Statistics Display**
Menampilkan 3 statistik utama:
- 📉 **Minimum** - Temperature terendah
- 📊 **Average** - Temperature rata-rata (dengan garis referensi)
- 📈 **Maximum** - Temperature tertinggi

##### 4. **Interactive Features**
- ✅ Toggle average line (garis rata-rata)
- ✅ Hover tooltip dengan detail lengkap
- ✅ Responsive untuk semua ukuran layar
- ✅ Smooth animations

##### 5. **Custom Tooltip**
Tooltip menampilkan:
- 🕐 Tanggal dan waktu lengkap
- 🌡️ Temperature dengan format 2 desimal
- 📍 Lokasi sensor (jika ada)
- 🔌 Sensor ID (jika ada)

## 📦 Library yang Digunakan

### Recharts
```bash
npm install recharts
```

**Alasan memilih Recharts:**
- ✅ React-friendly (built dengan React)
- ✅ Responsive dan mobile-friendly
- ✅ Customizable dan mudah digunakan
- ✅ Performa bagus untuk real-time data
- ✅ TypeScript support
- ✅ Dokumentasi lengkap

## 🎯 Implementasi di Pages

### Dashboard Page
```tsx
import { TemperatureChartCard } from '../components';
import { useSoilTemperatureHistory } from '../hooks/useSoilTemperature';

// Fetch data 24 jam terakhir
const { data: historyData } = useSoilTemperatureHistory(
  new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  new Date().toISOString()
);

// Render chart
{historyData && historyData.length > 0 && (
  <TemperatureChartCard 
    data={historyData} 
    title="📈 Grafik Temperature 24 Jam Terakhir"
  />
)}
```

### Temperature Page
```tsx
import { TemperatureChartCard } from '../components';
import { useSoilTemperatureHistory } from '../hooks/useSoilTemperature';

// Fetch data 7 hari terakhir
const { data: historyData } = useSoilTemperatureHistory(
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  new Date().toISOString()
);

// Render chart
{historyData && historyData.length > 0 && (
  <TemperatureChartCard 
    data={historyData} 
    title="📈 Grafik Temperature 7 Hari Terakhir"
  />
)}
```

## 🎨 Styling & Customization

### Color Scheme
Chart menggunakan color scheme yang konsisten:
- **Primary Color**: Blue (#3b82f6) - untuk line/area
- **Average Line**: Red (#ef4444) - untuk garis rata-rata
- **Grid**: Light Gray (#e5e7eb)
- **Gradient**: Blue gradient untuk area chart

### Responsive Breakpoints
```tsx
// Chart beradaptasi dengan ukuran layar:
- Mobile: Stack controls vertically
- Tablet: Flex wrap controls
- Desktop: Horizontal layout

// Statistics cards responsive:
grid-cols-3 // Desktop
grid-cols-1 sm:grid-cols-3 // Mobile to Desktop
```

## 📊 Data Format

### Input Data Structure
```typescript
interface TemperatureReading {
  id?: string;
  temperature: number;    // Temperature dalam Celsius
  timestamp: string;      // ISO 8601 format
  location?: string;      // Optional: Lokasi sensor
  sensorId?: string;      // Optional: ID sensor
}
```

### Chart Data Processing
Data diproses menjadi format yang lebih friendly untuk chart:
```typescript
{
  time: "14:30",              // Format waktu HH:mm
  date: "16 Okt",             // Format tanggal
  fullDate: "16/10/2025 14:30", // Full datetime untuk tooltip
  temp: 28.5,                 // Temperature dengan 1 desimal
  ...originalData             // Data asli tetap tersedia
}
```

## 🔄 Real-time Updates

Chart akan otomatis update ketika:
1. ✅ Data baru diterima dari API
2. ✅ User melakukan refresh manual
3. ✅ Polling interval trigger (30 detik)

## 🎯 Best Practices

### 1. Conditional Rendering
Selalu cek apakah data tersedia sebelum render:
```tsx
{historyData && historyData.length > 0 && (
  <TemperatureChartCard data={historyData} />
)}
```

### 2. Loading States
Implementasikan loading state:
```tsx
const { data, loading } = useSoilTemperatureHistory(...);

{loading ? (
  <LoadingSpinner />
) : data && data.length > 0 ? (
  <TemperatureChartCard data={data} />
) : (
  <EmptyState />
)}
```

### 3. Error Handling
Tangani error dengan baik:
```tsx
const { data, error } = useSoilTemperatureHistory(...);

{error && <ErrorMessage message={error} />}
```

## 🚀 Performance Tips

1. **Limit Data Points**: Untuk performa optimal, limit data points
   ```tsx
   // Tampilkan maksimal 100 data points
   const limitedData = data.slice(-100);
   ```

2. **Memoization**: Use useMemo untuk expensive calculations
   ```tsx
   const chartData = useMemo(() => 
     processChartData(data),
     [data]
   );
   ```

3. **Lazy Loading**: Load chart hanya ketika diperlukan
   ```tsx
   const TemperatureChart = lazy(() => 
     import('./TemperatureChartCard')
   );
   ```

## 📱 Mobile Optimization

Chart sudah dioptimasi untuk mobile:
- ✅ Responsive width (100%)
- ✅ Touch-friendly controls
- ✅ Adaptive font sizes
- ✅ Horizontal scroll pada axis labels
- ✅ Simplified tooltip untuk layar kecil

## 🎉 Features Roadmap

Future improvements:
- [ ] Export chart sebagai image
- [ ] Compare multiple sensors
- [ ] Prediction/forecast line
- [ ] Anomaly detection visualization
- [ ] Custom date range picker
- [ ] Data aggregation options (hourly, daily, weekly)

---

**Last Updated**: 2025-10-16  
**Version**: 1.0.0  
**Author**: Development Team
