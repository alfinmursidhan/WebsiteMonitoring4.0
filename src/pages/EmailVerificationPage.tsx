import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout, Button } from '../components';

const EmailVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Masukkan kode verifikasi lengkap');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (otpString === '123456') { // Demo OTP
        navigate('/forgot-password/success');
      } else {
        setError('Kode verifikasi salah');
      }
    }, 1500);
  };

  return (
    <MobileLayout title="Lupa Password" showBackButton onBack={() => navigate('/forgot-password/sent')}>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Selesaikan verifikasi email Anda
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Gunakan kode 6 digit yang telah kami kirimkan untuk memulihkan perubahan
          </p>
          <p className="text-orange text-sm font-medium">
            Demo kode: 123456
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-lg font-semibold bg-white border-2 rounded-xl transition-all duration-200 ${
                digit ? 'border-orange' : 'border-gray-200'
              } ${error ? 'border-red-400' : ''} focus:border-orange focus:outline-none focus:shadow-lg`}
            />
          ))}
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        {/* Form */}
        <div className="w-full max-w-sm space-y-6">
          <Button
            fullWidth
            onClick={handleVerify}
            loading={isLoading}
            disabled={isLoading || otp.some(digit => !digit)}
          >
            Selanjutnya
          </Button>
          
          <div className="text-center">
            <span className="text-gray-600 text-sm">Tidak menerima kode? </span>
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

export default EmailVerificationPage;