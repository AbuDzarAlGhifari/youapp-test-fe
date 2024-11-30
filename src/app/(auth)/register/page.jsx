'use client';

import { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/inputs/Input';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const isDisabled =
    !formData.email.trim() ||
    !formData.username.trim() ||
    !formData.password.trim() ||
    !formData.confirmPassword.trim();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (!email || !username || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    alert('Registration successfu!');
    setErrorMessage('');
  };

  return (
    <>
      <h2 className="px-10 text-2xl font-semibold">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col px-6 mt-6 mb-14">
        <div className="space-y-5">
          <Input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            placeholder="Create Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Create Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="relative mt-6">
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full py-3 text-base font-bold text-white transition duration-300 rounded-lg shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-lg hover:bg-gradient-to-r hover:to-green-300 hover:from-blue-500 disabled:opacity-50 disabled:bg-current"
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 text-red-500">{errorMessage}</div>
        )}

        <p className="text-sm text-center text-white mt-11">
          Have an account?{' '}
          <Link
            href="/login"
            className="text-yellow-200 border-b border-yellow-200 hover:opacity-50 hover:border-transparent"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
