'use client';

import React from 'react';

const inputStyleBase =
  'w-full bg-[#D9D9D9] bg-opacity-5 text-xs text-end text-white p-2 rounded-md outline-none border border-[#D9D9D9] border-opacity-25 mt-1';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  readOnly = false,
}) => {
  const inputStyle = readOnly
    ? `${inputStyleBase} cursor-not-allowed text-opacity-50`
    : inputStyleBase;

  const inputClasses =
    type === 'number' ? `${inputStyle} no-counter` : inputStyle;

  return (
    <div className="grid items-center grid-cols-12">
      <label className="col-span-4 text-xs text-white text-opacity-45">
        {label}
      </label>
      <div className="col-span-8">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={inputClasses}
        />
      </div>
    </div>
  );
};

export default InputField;
