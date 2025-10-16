import React, { useState } from 'react';
import { User, Mail, Phone, Globe, Settings, LogOut, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Card, Button, Input } from '../components';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Username1029526',
    email: user?.email || 'username@gmail.com',
    phone: '+62',
    language: 'Bahasa Indonesia',
    sensor: 'Keloktokan 10 Sensor',
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Account deletion requested');
    setShowDeleteDialog(false);
    logout();
    navigate('/login');
  };

  const LogoutDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Apakah anda yakin ingin keluar dari aplikasi?
        </h3>
        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowLogoutDialog(false)}
          >
            Tidak
          </Button>
          <Button
            fullWidth
            onClick={handleLogout}
          >
            Ya
          </Button>
        </div>
      </Card>
    </div>
  );

  const DeleteDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Apakah anda yakin ingin mengganti akun?
        </h3>
        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowDeleteDialog(false)}
          >
            Tidak
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleDeleteAccount}
          >
            Ya
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 ml-16 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-600 text-sm sm:text-base">Kelola informasi akun dan pengaturan</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Profile Header */}
            <Card className="lg:col-span-2" gradient padding="md">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-inner">
                      <User size={32} className="text-orange" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-white flex-1 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-1">{formData.fullName}</h2>
                  <p className="text-base sm:text-lg opacity-90 mb-3">Administrator</p>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium"
                  >
                    {isEditing ? '💾 Simpan' : '✏️ Edit Profile'}
                  </button>
                </div>
              </div>
            </Card>

            {/* Profile Details */}
            <Card className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Informasi Pribadi</h3>
              <div className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  value={formData.fullName}
                  onChange={handleInputChange('fullName')}
                  icon={User}
                  disabled={!isEditing}
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  icon={Mail}
                  disabled={!isEditing}
                />

                <Input
                  label="Nomor Telepon"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  icon={Phone}
                  disabled={!isEditing}
                />

                <Input
                  label="Alamat Lengkap"
                  value={formData.language}
                  onChange={handleInputChange('language')}
                  icon={Globe}
                  disabled={!isEditing}
                />

                <Input
                  label="IO Sensor"
                  value={formData.sensor}
                  onChange={handleInputChange('sensor')}
                  icon={Settings}
                  disabled={!isEditing}
                />
              </div>
            </Card>

            {/* Settings & Actions */}
            <Card className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Pengaturan</h3>
              
              <div className="space-y-4 mb-6">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors text-left">
                  <Settings size={20} className="text-gray-600" />
                  <span className="flex-1">Pengaturan Sistem</span>
                  <span className="text-gray-400">›</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors text-left">
                  <Globe size={20} className="text-gray-600" />
                  <span className="flex-1">Bahasa</span>
                  <span className="text-sm text-gray-500">Bahasa Indonesia</span>
                </button>
              </div>

              <div className="space-y-3">
                <Button
                  variant="secondary"
                  fullWidth
                  icon={LogOut}
                  iconPosition="left"
                  onClick={() => setShowLogoutDialog(true)}
                >
                  Ganti Akun
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  icon={Trash2}
                  iconPosition="left"
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-red-500 border-red-500 hover:bg-red-50"
                >
                  Keluar
                </Button>
              </div>
            </Card>
          </div>

          {/* Dialogs */}
          {showLogoutDialog && <LogoutDialog />}
          {showDeleteDialog && <DeleteDialog />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;