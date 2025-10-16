import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { Sidebar, Card } from '../components';

interface NotificationItem {
  id: string;
  type: 'discount' | 'maintenance' | 'location' | 'warning' | 'success';
  title: string;
  message: string;
  time: string;
  date: string;
  isRead: boolean;
}

const NotificationsPage: React.FC = () => {

  const notifications: NotificationItem[] = [
    {
      id: '1',
      type: 'discount',
      title: '30% Spesial Diskon!',
      message: 'Buruan beli belanja sekarang juga dengan potongan harga...',
      time: 'Hari Ini',
      date: '',
      isRead: false,
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'Pemeliharaan Rutin',
      message: 'Banyak sistem tanah sistem tanah tampil sangat baik.',
      time: 'Kemarin',
      date: '',
      isRead: true,
    },
    {
      id: '3',
      type: 'location',
      title: 'Posisikan titik koordinat dengan benar',
      message: 'Tetap tuta titik koordinat rawi dengan system saya',
      time: '',
      date: 'June 7, 2023',
      isRead: true,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Banyak Dikhilangkan Ke Alamat',
      message: 'Banyak data sistem tanah tampil sangat tidak stabil',
      time: '',
      date: 'June 7, 2023',
      isRead: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Akun telah selesai diterapkan',
      message: 'Akun Anda sistem tanah tampil sangat untuk pengawasan',
      time: '',
      date: 'June 7, 2023',
      isRead: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return '🎉';
      case 'maintenance':
        return '🔧';
      case 'location':
        return '📍';
      case 'warning':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return '🔔';
    }
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const key = notification.time || notification.date;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(notification);
    return acc;
  }, {} as Record<string, NotificationItem[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Notifikasi</h1>
            <p className="text-gray-600 text-sm sm:text-base">Semua notifikasi sistem monitoring</p>
          </div>
          
          <div className="space-y-6">
            {Object.entries(groupedNotifications).map(([timeGroup, groupNotifications]) => (
              <div key={timeGroup} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-5">
                {/* Time Group Header */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">{timeGroup}</h3>
                
                {/* Notifications in this group */}
                <div className="space-y-3">
                  {groupNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`${
                        !notification.isRead ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white'
                      } cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group`}
                      onClick={() => {
                        // Mark as read logic here
                        console.log('Notification clicked:', notification.id);
                      }}
                      padding="sm"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          notification.type === 'discount' ? 'bg-purple-100' :
                          notification.type === 'maintenance' ? 'bg-blue-100' :
                          notification.type === 'location' ? 'bg-green-100' :
                          notification.type === 'warning' ? 'bg-yellow-100' :
                          notification.type === 'success' ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-orange transition-colors">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                {notification.message}
                              </p>
                            </div>
                            <ChevronRight size={18} className="text-gray-400 group-hover:text-orange flex-shrink-0 transition-colors" />
                          </div>
                          
                          {/* Read indicator */}
                          {!notification.isRead && (
                            <div className="flex items-center mt-3 px-2 py-1 bg-orange/10 rounded-full w-fit">
                              <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse"></div>
                              <span className="text-xs text-orange ml-2 font-medium">Belum dibaca</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Empty state if no notifications */}
            {notifications.length === 0 && (
              <Card className="bg-white/80 backdrop-blur-sm" padding="lg">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Bell size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Belum ada notifikasi
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Notifikasi akan muncul di sini ketika ada update terbaru dari sistem monitoring
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;