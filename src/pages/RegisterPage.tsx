import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Eye, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout, Button, Input, Card } from '../components';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to login after successful registration
      navigate('/login', { 
        state: { message: 'Akun berhasil dibuat! Silakan login.' }
      });
    }, 2000);
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col justify-center px-6 py-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Ayo Buat Akun Baru
            </h1>
            <p className="text-gray-600">
              Isi informasi Anda dan mulai berbagi dan bermonitoring
            </p>
          </div>

          {/* Registration Form */}
          <Card className="mb-6">
            <div className="space-y-4">
              <Input
                label="Nama Panggilan"
                type="text"
                placeholder="Isi nama panggilan mu"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                icon={User}
                error={errors.fullName}
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="contoh@gmail.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                icon={Mail}
                error={errors.email}
                required
              />

              <Input
                label="Nomor Telepon"
                type="tel"
                placeholder="+62"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                icon={Phone}
                error={errors.phone}
                required
              />

              <Input
                label="Kata Sandi"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                icon={Lock}
                error={errors.password}
                required
              />

              <Button
                fullWidth
                onClick={handleRegister}
                loading={isLoading}
                disabled={isLoading}
              >
                Buat Akun
              </Button>
            </div>
          </Card>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Atau</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-8">
            <Button
              variant="secondary"
              fullWidth
              icon={Eye}
              iconPosition="left"
            >
              Lanjut dengan Google
            </Button>

            <Button
              variant="secondary"
              fullWidth
              icon={Apple}
              iconPosition="left"
            >
              Lanjut dengan Apple
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <span className="text-gray-600">Sudah punya akun? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-orange font-medium hover:text-orange-dark"
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default RegisterPage;