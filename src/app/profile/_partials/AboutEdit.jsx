'use client';

import React, { useState } from 'react';

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
    name: data?.name || '',
    gender: data?.gender || '',
    birthday: data?.birthday || '',
    height: data?.height || '',
    weight: data?.weight || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <FormField label="Display name:">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleInputChange}
          className={inputStyle}
        />
      </FormField>

      <FormField label="Gender:">
        <select
          name="gender"
          value={formData.gender}
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
          value={formData.birthday}
          onChange={handleInputChange}
          className={inputStyle}
        />
      </FormField>

      <FormField label="Height:">
        <input
          type="number"
          name="height"
          placeholder="Add height"
          value={formData.height}
          onChange={handleInputChange}
          className={inputStyle}
        />
      </FormField>

      <FormField label="Weight:">
        <input
          type="number"
          name="weight"
          placeholder="Add weight"
          value={formData.weight}
          onChange={handleInputChange}
          className={inputStyle}
        />
      </FormField>

      <button
        type="submit"
        className="text-sm text-yellow-300 hover:text-opacity-55"
      >
        Save
      </button>
    </form>
  );
};

export default AboutEdit;
