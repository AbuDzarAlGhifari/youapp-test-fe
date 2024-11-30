'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import BannerImage from './_partials/BannerImage';
import About from './_partials/About';
import Interest from './_partials/Interest';

const ProfilePage = () => {
  // State untuk data profil
  const [profileData, setProfileData] = useState({
    username: 'johndoe',
    gender: '',
    birthday: '28/08/2000',
    age: '20',
    horoscope: 'Virgo',
    zodiac: 'Pig',
    height: '175',
    weight: '69',
    imgurl: '',
  });

  // Fungsi untuk menyimpan data yang diperbarui
  const handleSave = (updatedData) => {
    setProfileData((prev) => ({ ...prev, ...updatedData }));
    console.log('Updated Profile Data:', updatedData);
  };

  return (
    <div className="min-h-screen bg-[#09141A] flex flex-col items-center sm:justify-center px-2 text-white">
      <div className="w-full max-w-sm mx-auto sm:rounded-xl pt-9 sm:px-5 sm:shadow-lg">
        {/* Header */}
        <div className="flex justify-between mb-7">
          <Link
            href="./"
            className="flex items-center gap-1 text-sm font-bold hover:opacity-70"
          >
            <FaAngleLeft className="size-5" />
            Back
          </Link>
          <div className="text-sm font-semibold">@{profileData.username}</div>
          <HiDotsHorizontal className="size-5" />
        </div>

        {/* Banner Image */}
        <section className="mb-6">
          <BannerImage data={profileData} />
        </section>

        {/* About Section */}
        <section className="mb-[18px]">
          <About data={profileData} onSave={handleSave} />
        </section>

        {/* Interest Section */}
        <section className="mb-[18px]">
          <Interest interests={['Music', 'Basketball', 'Fitness', 'Gymming']} />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
