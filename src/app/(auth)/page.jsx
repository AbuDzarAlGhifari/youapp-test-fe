'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/services/auth';
import { toast } from 'react-hot-toast';
import Input from '@/components/inputs/Input';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailOrUsername = e.target.emailOrUsername.value.trim();
    const password = e.target.password.value.trim();

    if (!emailOrUsername || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    const data = {
      email: emailOrUsername.includes('@') ? emailOrUsername : '',
      username: emailOrUsername.includes('@') ? '' : emailOrUsername,
      password,
    };

    setIsLoading(true);
    try {
      const response = await loginUser(data);
      toast.success(response.message || 'Login successful!');
      localStorage.setItem('access_token', response.access_token || '');
      router.push('/profile');
    } catch (error) {
      toast.error(error);
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
            placeholder="Enter Email or Username"
            name="emailOrUsername"
          />
          <Input type="password" placeholder="Enter Password" name="password" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-6 text-base font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-300 disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm text-center text-white mt-11">
          No account?{' '}
          <Link
            href="/register"
            className="text-yellow-200 border-b border-yellow-200 hover:opacity-50"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
