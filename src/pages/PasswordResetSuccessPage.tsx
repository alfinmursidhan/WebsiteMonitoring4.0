import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout, Button } from '../components';

const PasswordResetSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout title="Lupa Password" showBackButton onBack={() => navigate('/forgot-password/verify')}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-green-300 rounded-full flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Kata sandi Anda telah diubah
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Akun Anda sekarang sudah dipulihkan.
            Silakan login dengan password baru Anda.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm">
          <Button
            fullWidth
            onClick={() => navigate('/login')}
          >
            Kembali ke Halaman Login
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PasswordResetSuccessPage;