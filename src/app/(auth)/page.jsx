'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/inputs/Input';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const isDisabled =
    !formData.emailOrUsername.trim() || !formData.password.trim();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { emailOrUsername, password } = formData;

    if (!emailOrUsername || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    alert('Login successful (mock)!');
    setErrorMessage('');
  };

  return (
    <>
      <h2 className="px-10 text-2xl font-semibold">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col px-6 mt-6 mb-14">
        <div className="space-y-5">
          <Input
            type="text"
            placeholder="Enter Email or Username"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative mt-6">
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full py-3 text-base font-bold text-white transition duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-lg hover:bg-gradient-to-r hover:to-green-300 hover:from-blue-500 disabled:opacity-50 disabled:bg-current"
          >
            Login
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}

        <p className="text-sm text-center text-white mt-11">
          No account?{' '}
          <Link
            href="/register"
            className="text-yellow-200 border-b border-yellow-200 hover:opacity-50 hover:border-transparent"
          >
            Register here
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginPage;
