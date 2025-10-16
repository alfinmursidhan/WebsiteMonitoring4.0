import React, { useState, useEffect } from 'react';
import { Bell, History, Home, User, LogOut, ChevronUp, ChevronDown, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isNavMinimized, setIsNavMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-all duration-300 ${
      scrolled ? 'shadow-lg' : 'shadow-md'
    }`}>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Monitoring</h1>
              <p className="text-xs text-gray-500">Soil Monitoring System</p>
            </div>
          </div>

          {/* Navigation Links with Minimize Button */}
          <div className="hidden md:flex items-center relative">
            {/* Minimize/Expand Button */}
            <button
              onClick={() => setIsNavMinimized(!isNavMinimized)}
              className="mr-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title={isNavMinimized ? 'Tampilkan Menu' : 'Sembunyikan Menu'}
            >
              {isNavMinimized ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </button>
            
            {/* Navigation Items */}
            <div className={`flex items-center space-x-8 transition-all duration-300 overflow-hidden ${
              isNavMinimized ? 'max-w-0 opacity-0' : 'max-w-96 opacity-100'
            }`}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'text-orange bg-orange/10'
                        : 'text-gray-600 hover:text-orange hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-orange hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              onClick={() => navigate('/notifications')}
              className="p-2 text-gray-600 hover:text-orange hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Bell size={20} />
              <div className="absolute w-3 h-3 bg-red-500 rounded-full -top-1 -right-1"></div>
            </button>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">{user?.fullName || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.fullName?.charAt(0) || 'A'}
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden border-t border-gray-200 transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg transition-colors text-left ${
                  isActive ? 'text-orange bg-orange/10' : 'text-gray-600 hover:text-orange hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          {/* Mobile User Actions */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <button
              onClick={() => navigate('/notifications')}
              className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 hover:text-orange hover:bg-gray-100 transition-colors text-left"
            >
              <Bell size={20} />
              <span>Notifikasi</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 hover:text-red-500 hover:bg-gray-100 transition-colors text-left"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;