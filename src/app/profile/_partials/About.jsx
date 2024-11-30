'use client';

import React, { useState } from 'react';
import AboutEdit from './AboutEdit';
import { LuPencilLine } from 'react-icons/lu';

const About = ({ data, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedData) => {
    onSave(updatedData);
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-medium text-white">About</h1>
        {!isEditing ? (
          <LuPencilLine
            className="text-white cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <div className="flex space-x-2">
            <button
              className="text-sm text-yellow-300 hover:text-opacity-55"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <AboutEdit data={data} onSave={handleSave} />
      ) : isDataEmpty ? (
        <p className="text-sm font-medium text-white text-opacity-45">
          Add in your details to help others know you better
        </p>
      ) : (
        <ul className="space-y-2.5 text-sm font-medium text-white">
          {data.birthday && (
            <li>
              <span className="text-white text-opacity-45">Birthday:</span>{' '}
              {data.birthday}
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
