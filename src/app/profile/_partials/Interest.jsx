'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import { toast } from 'react-hot-toast';
import { getProfile, createProfile } from '@/services/profile';

const Interest = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Unauthorized. Please login.');
        return;
      }

      try {
        const profileData = await getProfile(token);
        console.log(profileData);
        if (profileData.data && profileData.data.interests) {
          setInterests(profileData.data.interests);
        } else {
          toast.error('No interests found.');
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to fetch interests.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateInterests = async (newInterests) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      toast.error('Unauthorized. Please login.');
      return;
    }

    try {
      const payload = {
        name: '',
        birthday: '',
        height: 0,
        weight: 0,
        interests: newInterests,
      };

      const response = await createProfile(payload, token);
      toast.success(response.message || 'Interests updated successfully');
      setInterests(newInterests);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update interests.'
      );
    }
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="h-auto bg-[#0E191F] px-7 pt-4 pb-7 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-medium text-white">Interest</h1>
        <Link href="./profile/interest">
          <LuPencilLine className="text-white cursor-pointer" />
        </Link>
      </div>

      {interests.length === 0 ? (
        <p className="text-sm font-medium text-white text-opacity-45">
          Add in your interest to find a better match
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm font-medium text-white bg-[#172C35] rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interest;
