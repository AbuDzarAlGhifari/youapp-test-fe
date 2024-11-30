'use client';

import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Input = ({ type = 'text', placeholder, name }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isPassword = type === 'password';

  return (
    <div className="relative">
      <input
        type={isPassword && passwordVisible ? 'text' : type}
        placeholder={placeholder}
        className="w-full px-4 py-4 text-sm text-white rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        name={name}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 text-gray-400 right-4 hover:text-gray-200"
        >
          {passwordVisible ? (
            <BsEye size={20} className="text-yellow-200" />
          ) : (
            <BsEyeSlash size={20} className="text-yellow-200" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
