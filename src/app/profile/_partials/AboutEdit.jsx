'use client';

import InputField from '@/components/inputs/InputField';
import SelectField from '@/components/inputs/SelectField';
import React from 'react';
import { formatDateInput } from '@/utils/dateUtils';
import { FaPlus } from 'react-icons/fa6';

const genderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const AboutEdit = ({ data, onInputChange }) => {
  return (
    <form className="space-y-4">
      {/* Section Gambar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center bg-gray-600 cursor-pointer size-14 rounded-2xl">
          <FaPlus className="size-6" />
        </div>
        <p className="text-xs font-medium text-white">Add image</p>
      </div>

      {/* Name */}
      <InputField
        label="Display name:"
        type="text"
        name="name"
        value={data.name}
        onChange={onInputChange}
        placeholder="Enter name"
      />

      {/* Gender */}
      <SelectField
        label="Gender:"
        name="gender"
        value={data.gender}
        onChange={onInputChange}
        options={genderOptions}
      />

      {/* Birthday */}
      <InputField
        label="Birthday:"
        type="date"
        name="birthday"
        value={data.birthday}
        onChange={onInputChange}
        placeholder={formatDateInput(data.birthday)}
      />

      {/* Horoscope */}
      <InputField
        label="Horoscope:"
        type="text"
        name="horoscope"
        value={data.horoscope}
        readOnly
      />

      {/* Zodiac */}
      <InputField
        label="Zodiac:"
        type="text"
        name="zodiac"
        value={data.zodiac}
        readOnly
      />

      {/* Height */}
      <InputField
        label="Height (cm):"
        type="number"
        name="height"
        value={data.height}
        onChange={onInputChange}
        placeholder="Add height"
      />

      {/* Weight */}
      <InputField
        label="Weight (kg):"
        type="number"
        name="weight"
        value={data.weight}
        onChange={onInputChange}
        placeholder="Add weight"
      />
    </form>
  );
};

export default AboutEdit;
