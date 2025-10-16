import React, { useState } from 'react';
import { Bell, History, Home, User, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/history', label: 'History', icon: History },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-sm border-r border-gray-200/80 shadow-xl z-50 transition-all duration-300 ease-in-out ${
        isMinimized ? 'w-16' : 'md:w-64 w-16'
      }`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className={`flex items-center transition-all duration-300 ${
            isMinimized ? 'justify-center' : 'gap-3'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            {!isMinimized && (
              <div className="animate-fadeIn">
                <h1 className="text-xl font-bold text-gray-800">Monitoring</h1>
                <p className="text-xs text-gray-500 font-medium">Soil System</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="py-2 px-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-200 rounded-lg mx-1 my-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-orange hover:bg-orange-50'
                } ${isMinimized ? 'justify-center px-3' : ''}`}
                title={isMinimized ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isMinimized && (
                  <span className="animate-fadeIn font-medium">{item.label}</span>
                )}
                {isActive && !isMinimized && (
                  <div className="w-1.5 h-1.5 bg-white rounded-full ml-auto"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Notifications */}
        <div className="px-2 py-2">
          <button
            onClick={() => navigate('/notifications')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-orange hover:bg-orange-50 rounded-lg transition-all duration-200 relative mx-1 ${
              isMinimized ? 'justify-center' : ''
            }`}
            title={isMinimized ? 'Notifikasi' : ''}
          >
            <Bell size={20} className="flex-shrink-0" />
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1.5 left-6 animate-pulse"></div>
            {!isMinimized && (
              <span className="animate-fadeIn font-medium">Notifikasi</span>
            )}
          </button>
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white">
          {/* User Info */}
          <div className={`p-4 ${isMinimized ? 'text-center' : ''}`}>
            <div className={`flex items-center gap-3 ${isMinimized ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {user?.fullName?.charAt(0) || 'A'}
              </div>
              {!isMinimized && (
                <div className="animate-fadeIn">
                  <p className="text-sm font-medium text-gray-800">{user?.fullName || 'Admin'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="px-4 pb-4">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ${
                isMinimized ? 'justify-center' : ''
              }`}
              title={isMinimized ? 'Logout' : ''}
            >
              <LogOut size={18} className="flex-shrink-0" />
              {!isMinimized && (
                <span className="animate-fadeIn font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 text-gray-600 hover:text-orange hover:border-orange-200"
        >
          {isMinimized ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {!isMinimized && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMinimized(true)}
        />
      )}
    </>
  );
};

export default Sidebar;