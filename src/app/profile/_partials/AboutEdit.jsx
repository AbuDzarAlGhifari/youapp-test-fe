'use client';

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const FormField = ({ label, children }) => (
  <div className="grid items-center grid-cols-12">
    <label className="col-span-4 text-xs text-white text-opacity-45">
      {label}
    </label>
    <div className="col-span-8">{children}</div>
  </div>
);

const inputStyle =
  'w-full bg-[#1C2A33] text-xs text-end text-white text-sm p-2 rounded-md outline-none border border-[#D9D9D9] border-opacity-5 mt-1';

const genderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const AboutEdit = ({ data, onSave }) => {
  const [formData, setFormData] = useState({
    displayName: data?.username || '',
    gender: data?.gender || '',
    birthday: data?.birthday || '',
    horoscope: data?.horoscope || '',
    zodiac: data?.zodiac || '',
    height: data?.height || '',
    weight: data?.weight || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { displayName, gender, birthday, horoscope, zodiac, height, weight } =
    formData;

  return (
    <form className="space-y-4">
      {/* Bagian Gambar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center bg-gray-600 cursor-pointer size-14 rounded-2xl">
          <FaPlus className="size-6" />
        </div>
        <p className="text-xs font-medium text-white">Add image</p>
      </div>

      {/* Input Fields */}
      <div className="space-y-1">
        <FormField label="Display name:">
          <input
            type="text"
            name="displayName"
            placeholder="Enter name"
            value={displayName}
            onChange={handleInputChange}
            className={inputStyle}
          />
        </FormField>

        <FormField label="Gender:">
          <select
            name="gender"
            value={gender}
            onChange={handleInputChange}
            className={inputStyle}
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Birthday:">
          <input
            type="date"
            name="birthday"
            value={birthday}
            onChange={handleInputChange}
            className={inputStyle}
          />
        </FormField>

        <FormField label="Horoscope:">
          <input
            type="text"
            name="horoscope"
            placeholder="--"
            value={horoscope}
            onChange={handleInputChange}
            className={inputStyle}
          />
        </FormField>

        <FormField label="Zodiac:">
          <input
            type="text"
            name="zodiac"
            placeholder="--"
            value={zodiac}
            onChange={handleInputChange}
            className={inputStyle}
          />
        </FormField>

        <FormField label="Height:">
          <input
            type="number"
            name="height"
            placeholder="Add height"
            value={height}
            onChange={handleInputChange}
            className={inputStyle}
          />
        </FormField>

        <FormField label="Weight:">
          <input
            type="number"
            name="weight"
            placeholder="Add weight"
            value={weight}
            onChange={handleInputChange}
            className={inputStyle}
          />
        </FormField>
      </div>
    </form>
  );
};

export default AboutEdit;
