'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import BannerImage from './_partials/BannerImage';
import About from './_partials/About';
import Interest from './_partials/Interest';
import { getProfile, createProfile, updateProfile } from '@/services/profile';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Unauthorized. Please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile(token);
        setProfileData(response.data);
      } catch (error) {
        toast.error(error || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast.error('Unauthorized. Please login.');
      return;
    }

    try {
      const payload = {
        name: updatedData.name,
        birthday: updatedData.birthday,
        height: Number(updatedData.height),
        weight: Number(updatedData.weight),
        interests: updatedData.interests || [],
        gender: updatedData.gender,
      };

      let response;
      if (profileData?.id) {
        response = await updateProfile(payload, token);
      } else {
        response = await createProfile(payload, token);
      }

      toast.success(response.message || 'Profile saved successfully');
      setProfileData((prev) => ({ ...prev, ...updatedData }));
    } catch (error) {
      toast.error(error || 'Failed to save profile.');
    }
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (!profileData) {
    return <p className="text-white">Failed to load profile.</p>;
  }

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
          <div className="text-sm font-semibold">
            @{profileData.username || 'Anonymous'}
          </div>
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
          <Interest interests={profileData.interests || []} />
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
