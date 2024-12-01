'use client';

import React, { useState } from 'react';
import AboutEdit from './AboutEdit';
import { LuPencilLine } from 'react-icons/lu';
import { calculateAge, formatDate } from '@/utils/dateUtils';

const About = ({ data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.name || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    setIsEditing(false);
  };

  const isDataEmpty =
    !data?.birthday &&
    !data?.horoscope &&
    !data?.zodiac &&
    !data?.height &&
    !data?.weight;

  return (
    <div className="h-auto bg-[#0E191F] px-7 pt-4 pb-7 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-medium text-white">About</h1>
        {!isEditing ? (
          <LuPencilLine
            className="text-white cursor-pointer hover:opacity-70"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <button
            className="text-sm text-gold hover:opacity-75"
            onClick={handleSubmit}
          >
            Save & Update
          </button>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <AboutEdit data={formData} onInputChange={handleInputChange} />
      ) : isDataEmpty ? (
        <p className="text-sm font-medium text-white text-opacity-45">
          Add your details to help others know you better.
        </p>
      ) : (
        <ul className="space-y-2.5 text-sm font-medium text-white">
          {data.birthday && (
            <li>
              <span className="text-white text-opacity-45">Birthday:</span>{' '}
              {formatDate(data.birthday)}{' '}
              <span className="text-white text-opacity-45">
                (Age {calculateAge(data.birthday)})
              </span>
            </li>
          )}
          {data.horoscope && (
            <li>
              <span className="text-white text-opacity-45">Horoscope:</span>{' '}
              {data.horoscope}
            </li>
          )}
          {data.zodiac && (
            <li>
              <span className="text-white text-opacity-45">Zodiac:</span>{' '}
              {data.zodiac}
            </li>
          )}
          {data.height && (
            <li>
              <span className="text-white text-opacity-45">Height:</span>{' '}
              {data.height} cm
            </li>
          )}
          {data.weight && (
            <li>
              <span className="text-white text-opacity-45">Weight:</span>{' '}
              {data.weight} kg
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default About;
