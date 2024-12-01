'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/services/auth';
import Input from '@/components/inputs/Input';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const isFormValid = Object.values(formData).every((value) => value.trim());

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword } = formData;

    if (!isFormValid) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await registerUser({ email, username, password });
      setSuccessMessage(response.message || 'Registration successful!');
      router.push('/');
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="px-10 text-2xl font-semibold">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col px-6 mt-6 mb-14">
        <div className="space-y-5">
          <Input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Create Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Create Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errorMessage && (
          <p className="mt-3 text-sm text-center text-red-500">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mt-3 text-sm text-center text-green-500">
            {successMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full py-3 mt-6 text-base font-bold text-white rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-sm text-center text-white mt-11">
          Have an account?{' '}
          <Link
            href="/"
            className="border-b border-yellow-200 text-gold hover:opacity-50"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
