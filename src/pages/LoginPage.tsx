import React, { useState } from 'react';
import { Mail, Lock, Eye, Apple } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout, Button, Input, Card } from '../components';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user types
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError('Harap isi semua field');
      return;
    }

    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email atau password salah');
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col justify-center px-6 py-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Selamat Datang Kembali!
            </h1>
            <p className="text-gray-600">
              Sistem Pemantauan Tanah siap memantau kondisi tanah Anda secara real time
            </p>
          </div>

          {/* Login Form */}
          <Card className="mb-6 shadow-lg" padding="lg">
            <div className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleInputChange('email')}
                icon={Mail}
                error={error && !formData.email ? 'Email wajib diisi' : ''}
              />

              <Input
                label="Kata sandi"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange('password')}
                icon={Lock}
                error={error && !formData.password ? 'Password wajib diisi' : ''}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm text-center py-2 px-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="text-right">
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="text-orange text-sm hover:text-orange-600 transition-colors font-medium"
                >
                  Lupa password?
                </button>
              </div>

              <Button
                fullWidth
                onClick={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                className="py-3"
              >
                Masuk
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

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600">Belum punya akun? </span>
            <button
              onClick={() => navigate('/register')}
              className="text-orange font-medium hover:text-orange-dark"
            >
              Daftar sekarang
            </button>
          </div>

          {/* Demo Credentials Info */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <div className="text-center">
              <h3 className="font-medium text-blue-800 mb-2">Demo Login</h3>
              <p className="text-sm text-blue-600">
                Email: <span className="font-mono">admin</span><br />
                Password: <span className="font-mono">password123</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginPage;