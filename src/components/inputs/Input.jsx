'use client';

import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Input = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  required = false,
  className = '',
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const isPassword = type === 'password';

  return (
    <div className={`relative ${className}`}>
      <input
        type={isPassword && isPasswordVisible ? 'text' : type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-4 text-sm text-white rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={placeholder}
      />
      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 flex items-center text-gray-400 right-4 hover:text-gray-200 focus:outline-none"
        >
          {isPasswordVisible ? <BsEye size={20} /> : <BsEyeSlash size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
