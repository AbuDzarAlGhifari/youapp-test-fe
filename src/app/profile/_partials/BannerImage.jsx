'use client';

import React from 'react';
import { GiVirgo, GiPig } from 'react-icons/gi';

const BannerImage = ({ data }) => {
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div
      className="relative flex justify-end w-full h-48 mx-auto bg-center bg-cover bg-white/5 rounded-2xl"
      style={{
        backgroundImage: `url(${data.imgurl})`,
      }}
    >
      {/* Profile Info */}
      <div className="absolute flex flex-col gap-2 text-white bottom-3 left-3">
        {/* Username and Age */}
        <div className="font-bold text-white username">
          @{data.username}, {data.birthday ? calculateAge(data.birthday) : ''}
        </div>

        {/* Gender */}
        {data.gender ? <div className="text-sm">{data.gender}</div> : null}

        {/* Horoscope and Zodiac */}
        {data.birthday ? (
          <div className="flex flex-row gap-2">
            {/* Horoscope */}
            <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-white/5 w-fit">
              <GiVirgo className="text-lg" />
              <div>{data.horoscope}</div>
            </div>

            {/* Zodiac */}
            <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-white/5 w-fit">
              <GiPig className="text-lg" />
              <div>{data.zodiac}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BannerImage;
