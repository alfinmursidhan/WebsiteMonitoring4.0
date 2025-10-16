import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout, Button } from '../components';

const EmailSentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout title="Lupa Password" showBackButton onBack={() => navigate('/forgot-password')}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Email Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mb-8 relative">
          <div className="w-12 h-8 bg-white rounded-lg border-2 border-gray-300 relative">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-0.5 bg-orange absolute top-2"></div>
              <div className="w-8 h-0.5 bg-orange absolute top-3.5 left-2"></div>
              <div className="w-6 h-0.5 bg-orange absolute top-5 left-2"></div>
            </div>
          </div>
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Cek Email Anda
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kami telah mengirim email untuk reset password. Silakan cek email Anda untuk melakukan reset password.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm space-y-6">
          <Button
            fullWidth
            onClick={() => navigate('/forgot-password/verify')}
          >
            Cek Email
          </Button>
          
          <div className="text-center">
            <span className="text-gray-600 text-sm">Tidak menerima email? </span>
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-orange text-sm font-medium hover:text-orange-dark"
            >
              Kirim Ulang
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default EmailSentPage;