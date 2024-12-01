'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import BannerImage from './_partials/BannerImage';
import About from './_partials/About';
import Interest from './_partials/Interest';
import { getProfile, updateProfile } from '@/services/profile';
import Loading from '@/components/Loading';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setMessage({ text: 'Unauthorized. Please login.', type: 'error' });
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile(token);
        setProfileData(response.data);
      } catch (error) {
        setMessage({
          text: error.message || 'Failed to fetch profile.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (updatedData) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setMessage({ text: 'Unauthorized. Please login.', type: 'error' });
      return;
    }

    try {
      const payload = {
        name: updatedData.name,
        birthday: updatedData.birthday,
        height: Number(updatedData.height),
        weight: Number(updatedData.weight),
        interests: profileData?.interests || [],
      };

      const response = await updateProfile(payload, token);

      setMessage({
        text: response.message || 'Profile saved successfully',
        type: 'success',
      });

      setProfileData((prev) => ({
        ...prev,
        ...payload,
      }));

      setLoading(true);

      window.location.reload();
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to save profile.',
        type: 'error',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('gender');
    localStorage.removeItem('uploadedImage');
    router.push('/');
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) {
    return <Loading />;
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
          <div className="relative">
            <HiDotsHorizontal
              className="cursor-pointer size-5"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            {dropdownVisible && (
              <div className="absolute z-50 right-0 mt-2 w-32 bg-[#1C2A33] text-white rounded-md shadow-lg">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm rounded-md  hover:bg-[#2F3C47]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Display message */}
        {message.text && (
          <p
            className={`mb-4 text-sm text-center ${
              message.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message.text}
          </p>
        )}

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
