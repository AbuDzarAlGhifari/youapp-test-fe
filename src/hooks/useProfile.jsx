'use client';

import { useEffect, useState } from 'react';
import { getProfile } from '@/services/profile';
import { toast } from 'react-hot-toast';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
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
        const data = await getProfile(token);
        setProfile(data.data);
      } catch (error) {
        toast.error(error || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, setProfile, loading };
};
