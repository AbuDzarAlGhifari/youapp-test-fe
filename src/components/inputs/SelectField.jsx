'use client';

import React from 'react';

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="grid items-center grid-cols-12">
    <label className="col-span-4 text-xs text-white text-opacity-45">
      {label}
    </label>
    <div className="col-span-8">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#1C2A33] text-xs text-end text-white p-2 rounded-md outline-none border border-[#D9D9D9] border-opacity-25 mt-1"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectField;
