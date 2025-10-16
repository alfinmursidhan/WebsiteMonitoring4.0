import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout, Button, Input } from '../components';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (!email.trim()) {
      setError('Email wajib diisi');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/forgot-password/sent', { state: { email } });
    }, 2000);
  };

  return (
    <MobileLayout title="Lupa Password" showBackButton onBack={() => navigate('/login')}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Lock Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg relative">
            <div className="w-8 h-6 border-4 border-gray-600 rounded-t-lg absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
            <div className="w-3 h-3 bg-gray-600 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Masukkan email Anda
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Masukkan email yang Anda untuk menggunakan akun Anda. Kami akan mengirim kode verifikasi.
          </p>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={setEmail}
            icon={Mail}
            error={error}
          />

          <Button
            fullWidth
            onClick={handleSendEmail}
            loading={isLoading}
            disabled={isLoading || !email}
          >
            Kirim
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ForgotPasswordPage;