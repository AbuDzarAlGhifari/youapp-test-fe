'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/auth';
import Input from '@/components/inputs/Input';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const isFormValid = Object.values(formData).every((value) => value.trim());

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { emailOrUsername, password } = formData;

    if (!emailOrUsername || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const data = {
      email: emailOrUsername.includes('@') ? emailOrUsername : '',
      username: emailOrUsername.includes('@') ? '' : emailOrUsername,
      password,
    };

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await loginUser(data);
      localStorage.setItem('access_token', response.access_token || '');
      router.push('/profile');
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="px-10 text-2xl font-semibold">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col px-6 mt-6 mb-14">
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Enter Username/Email"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errorMessage && (
          <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full py-3 mt-6 text-base font-bold text-white rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-white mt-11">
          No account?{' '}
          <Link
            href="/register"
            className="border-b border-yellow-200 text-gold hover:opacity-50"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
