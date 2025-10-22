# 🌡️ Implementasi API Temperature Tanah

## Overview
Dokumentasi ini menjelaskan cara kerja implementasi API temperature tanah real-time di dalam aplikasi Website Monitoring.

## 📁 Struktur File Baru

### 1. **Config**
- `src/config/api.ts` - Konfigurasi API endpoint dan headers

### 2. **Services**
- `src/services/temperatureService.ts` - Service untuk mengambil data dari API

### 3. **Types**
- Update `src/types/monitoring.ts` - Menambahkan types untuk soil temperature

### 4. **Hooks**
- `src/hooks/useSoilTemperature.ts` - Custom hooks untuk data management

### 5. **Components**
- `src/components/SoilTemperatureCard.tsx` - Card component untuk display temperature

### 6. **Pages**
- `src/pages/TemperaturePage.tsx` - Halaman dedicated untuk monitoring temperature
- Update `src/pages/DashboardPage.tsx` - Menambahkan temperature card di dashboard

## 🚀 Cara Kerja

### 1. Configuration (api.ts)
```typescript
// Menggunakan environment variables untuk keamanan
VITE_TEMPERATURE_API_URL = "API_URL"
VITE_TEMPERATURE_API_KEY = "API_KEY"
```

### 2. Service Layer (temperatureService.ts)
Service ini bertanggung jawab untuk:
- ✅ Fetch latest temperature data
- ✅ Fetch historical data dengan date range
- ✅ Hitung average temperature
- ✅ Error handling

### 3. Custom Hooks (useSoilTemperature.ts)
Terdapat 3 hooks utama:

#### `useSoilTemperature(pollingInterval)`
- Auto-refresh data setiap X milliseconds (default: 30 detik)
- Return: `{ data, latestTemperature, loading, error, refetch }`

#### `useSoilTemperatureHistory(startDate, endDate)`
- Fetch historical data berdasarkan range tanggal
- Return: `{ data, loading, error, refetch }`

#### `useAverageSoilTemperature()`
- Hitung rata-rata temperature
- Return: `{ average, loading, error, refetch }`

### 4. Components

#### SoilTemperatureCard
Fitur:
- 🔄 Auto-refresh setiap 30 detik
- 🎨 Status indicator (Dingin/Optimal/Hangat/Panas)
- 🔄 Manual refresh button
- ⚡ Loading states
- ❌ Error handling dengan retry

### 5. Pages

#### TemperaturePage
Halaman dedicated dengan fitur:
- 📊 Current temperature display besar
- 📈 Statistics (Min, Max, Average)
- 📋 Historical data table (20 data terbaru)
- 🎨 Beautiful UI dengan gradient colors

## 🎯 Penggunaan

### Di Dashboard
```tsx
import { SoilTemperatureCard } from '../components';

// Gunakan di JSX
<SoilTemperatureCard />
```

### Custom Implementation
```tsx
import { useSoilTemperature } from '../hooks/useSoilTemperature';

function MyComponent() {
  const { latestTemperature, loading, error } = useSoilTemperature(30000);
  
  return (
    <div>
      {loading ? 'Loading...' : `${latestTemperature}°C`}
    </div>
  );
}
```

## 🔧 Konfigurasi

### Environment Variables (.env)
```env
VITE_TEMPERATURE_API_URL=https://api-sensor-tanah...
VITE_TEMPERATURE_API_KEY=your_api_key
VITE_POLLING_INTERVAL=30000
```

### Polling Interval
Ubah interval refresh di component:
```tsx
useSoilTemperature(60000) // Refresh setiap 60 detik
```

## 📊 Data Format

### API Response
```typescript
{
  id?: string;
  temperature: number;
  timestamp: string;
  location?: string;
  sensorId?: string;
}
```

### Status Temperature
- ❄️ **Dingin**: < 15°C
- ✅ **Optimal**: 15-25°C
- ⚠️ **Hangat**: 25-35°C
- 🔥 **Panas**: > 35°C

## 🔐 Security

1. **API Key** disimpan di `.env` file (tidak di-commit ke Git)
2. **Headers** dibuat secara otomatis dengan `getApiHeaders()`
3. **Environment variables** menggunakan Vite's `import.meta.env`

## 🐛 Error Handling

Service menghandle berbagai error scenarios:
- ❌ Network errors
- ❌ API errors (4xx, 5xx)
- ❌ Timeout
- ❌ Invalid response format

Setiap hook memiliki state `error` yang bisa digunakan untuk display error message ke user.

## 🎨 UI/UX Features

1. **Loading States**: Skeleton screens saat fetching data
2. **Error States**: User-friendly error messages dengan retry button
3. **Auto-refresh**: Indicator animasi untuk auto-refresh
4. **Manual Refresh**: Button untuk force refresh data
5. **Responsive Design**: Works di mobile dan desktop

## 📱 Responsive Design

- Mobile: Stack layout, compact cards
- Tablet: 2-column grid
- Desktop: 3-column grid dengan larger displays

## 🔄 Data Flow

```
API → temperatureService → useSoilTemperature Hook → Component → UI
```

1. Component mount → Hook fetch data
2. Data tersimpan di state
3. UI update dengan data baru
4. Setelah polling interval → Repeat

## 🚦 Status Indicators

- 🟢 **Online**: Data updating normally
- 🔴 **Error**: Connection issues
- ⚪ **Loading**: Fetching data

## 📈 Future Improvements

Potential enhancements:
1. 📊 Chart visualization (Line/Area chart)
2. 📧 Alert notifications untuk temperature abnormal
3. 📥 Export data ke CSV/Excel
4. 🔍 Advanced filtering dan search
5. 📱 Push notifications
6. 🌍 Multiple sensor support

## 🤝 Contributing

Untuk menambahkan sensor atau data baru:
1. Update types di `monitoring.ts`
2. Tambah service method di `temperatureService.ts`
3. Create new hook jika diperlukan
4. Update components untuk display data

## 📞 Support

Jika ada issues atau pertanyaan:
1. Check error logs di browser console
2. Verify API credentials di `.env`
3. Test API endpoint dengan Postman/curl
4. Check network connectivity

---

**Created by**: Copilot AI Assistant
**Last Updated**: October 2025
