'use client';

import React, { useEffect, useState } from 'react';
import { calculateAge } from '@/utils/dateUtils';
import { horoscopeIcon } from '@/utils/horoscope';
import { zodiacIcons } from '@/utils/zodiac';
import { LuPencilLine } from 'react-icons/lu';

const BannerImage = ({ data }) => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const storedImage = localStorage.getItem('uploadedImage');
    const storedGender = localStorage.getItem('gender');
    if (storedImage) {
      setBackgroundImage(storedImage);
    }
    if (storedGender) {
      setGender(storedGender);
    }
  }, []);

  const handleEditBackground = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = event.target.result;
          setBackgroundImage(image);
          localStorage.setItem('uploadedImage', image);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div
      className="relative flex justify-end w-full h-48 mx-auto bg-center bg-cover bg-white/5 rounded-2xl"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      }}
    >
      {/* Edit Icon */}
      <LuPencilLine
        onClick={handleEditBackground}
        className="absolute text-white cursor-pointer hover:opacity-70 top-3.5 right-6"
      />

      {/* Profile Info */}
      <div className="absolute flex flex-col gap-2 text-white bottom-3 left-3">
        {/* Name or Username */}
        <div className="font-bold text-white username">
          {data.name ? data.name : `@${data.username}`},{' '}
          {data.birthday ? calculateAge(data.birthday) : ''}
        </div>

        {/* Gender */}
        {gender ? <div className="text-sm">{gender}</div> : null}

        {/* Horoscope and Zodiac */}
        {data.birthday && data.horoscope ? (
          <div className="flex flex-row gap-2">
            <div className="flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full bg-white/10 w-fit">
              <div className="text-5xl">{horoscopeIcon[data.horoscope]}</div>
              <div>{data.horoscope}</div>
            </div>

            {data.zodiac && zodiacIcons[data.zodiac] ? (
              <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-white/10 w-fit">
                {zodiacIcons[data.zodiac]}
                <div>{data.zodiac}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BannerImage;
