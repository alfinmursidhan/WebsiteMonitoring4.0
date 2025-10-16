# Website Monitoring 4.0

Aplikasi web monitoring sistem tanah real-time menggunakan React dan InfluxDB.

## 🚀 Features

- **Authentication System**: Login, Register, Forgot Password dengan UI yang mengikuti desain mobile app
- **Real-time Dashboard**: Monitoring suhu, kelembaban, nutrisi tanah (N-P-K)
- **Data Visualization**: Charts untuk historical data menggunakan Recharts
- **Notifications**: System notifikasi untuk berbagai event monitoring
- **Profile Management**: User profile dan settings management
- **Responsive Design**: Mobile-first design yang responsive untuk semua device

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom gradients
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: InfluxDB (prepared structure)
- **State Management**: React Context

## 📱 Design

Website ini dibuat berdasarkan desain mobile app yang sudah ada, dengan konsep:
- **Color Scheme**: Orange (#FF9500) sebagai primary color
- **Layout**: Mobile-first dengan gradient background (pink-orange)
- **Components**: Modern UI dengan rounded corners dan shadows
- **Typography**: Inter font untuk readability

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone https://github.com/alfinmursidhan/WebsiteMonitoring4.0.git
cd WebsiteMonitoring4.0
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables (optional)
```bash
cp .env.example .env
# Edit .env dengan konfigurasi InfluxDB Anda
```

4. Start development server
```bash
npm run dev
```

5. Open browser dan akses `http://localhost:5173`

## 🔐 Demo Credentials

Untuk testing, gunakan kredensial berikut:
- **Username**: `admin`
- **Password**: `password123`

## 📊 InfluxDB Integration

Structure sudah disiapkan untuk integrasi dengan InfluxDB:

### Data Schema
- **Sensor Readings**: temperature, humidity, soil moisture, pH, N-P-K values
- **Weather Data**: temperature, humidity, pressure, wind data
- **Soil Health**: pH, nutrients, conductivity analysis

### API Services
- `influxService.ts`: Service untuk komunikasi dengan InfluxDB
- `useMonitoringData.ts`: Custom hooks untuk data fetching
- Real-time polling untuk update data otomatis

### Configuration
Update file `.env` dengan kredensial InfluxDB:
```env
VITE_INFLUX_URL=your-influx-url
VITE_INFLUX_TOKEN=your-token
VITE_INFLUX_ORG=your-org
VITE_INFLUX_BUCKET=your-bucket
```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── context/           # React context providers
├── services/          # API services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🎨 Components

- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Input**: Form inputs dengan icons dan validation
- **Card**: Container components dengan shadows dan gradients
- **MobileLayout**: Layout wrapper dengan mobile-style header

## 📱 Pages

1. **Authentication**
   - Login page
   - Register page
   - Forgot password flow
   - Email verification

2. **Dashboard**
   - Real-time monitoring data
   - Weather widget
   - Nutrient cards (N-P-K)
   - Soil health indicator

3. **History**
   - Historical data charts
   - Date range selection
   - Data visualization

4. **Notifications**
   - System notifications
   - Grouped by time
   - Read/unread status

5. **Profile**
   - User information
   - Settings management
   - Account actions

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Checking
```bash
npm run type-check
```

## 🚀 Deployment

Project siap untuk deployment ke:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- Docker containers

## 📝 TODO

- [ ] Connect to real InfluxDB instance
- [ ] Add data export functionality
- [ ] Implement push notifications
- [ ] Add more chart types
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- **Developer**: Alfin Mursidhan
- **Project**: WebsiteMonitoring4.0
- **Repository**: [https://github.com/alfinmursidhan/WebsiteMonitoring4.0](https://github.com/alfinmursidhan/WebsiteMonitoring4.0)
