'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import InputField from '@/components/inputs/InputField';
import SelectField from '@/components/inputs/SelectField';
import { formatDateInput } from '@/utils/dateUtils';
import { FaPlus } from 'react-icons/fa6';

const genderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const AboutEdit = ({ data, onInputChange }) => {
  const [imagePreview, setImagePreview] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('uploadedImage') : null
  );

  const [gender, setGender] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('gender') || '' : ''
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedGender = localStorage.getItem('gender');
      if (storedGender) {
        setGender(storedGender);
      }
    }
  }, []);

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gender', selectedGender);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setImagePreview(base64Image);
        localStorage.setItem('uploadedImage', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-4">
      {/* Section Gambar */}
      <label
        className="flex items-center gap-2 mb-4 cursor-pointer"
        htmlFor="imageUpload"
      >
        <div className="relative flex items-center justify-center overflow-hidden bg-[#D9D9D9] bg-opacity-5 w-14 h-14 rounded-2xl">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Uploaded"
              fill
              className="object-cover"
            />
          ) : (
            <FaPlus className="text-yellow-100 size-6" />
          )}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-xs font-medium text-white">Add image</p>
      </label>

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
        value={gender}
        onChange={handleGenderChange}
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
        label="Height:"
        type="number"
        name="height"
        value={data.height}
        onChange={onInputChange}
        placeholder="Add height"
      />

      {/* Weight */}
      <InputField
        label="Weight:"
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
