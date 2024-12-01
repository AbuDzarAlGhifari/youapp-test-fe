'use client';

import { getInterest, updateInterest } from '@/services/interest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import Tag from './_partials/Tag';

const InterestPage = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setErrorMessage('Unauthorized. Please login.');
        return;
      }

      try {
        const profileData = await getInterest(token);
        setInterests(profileData.interests || []);
      } catch (error) {
        setErrorMessage(error.message || 'Failed to load profile.');
      }
    };

    fetchData();
  }, []);

  const handleAddInterest = (e) => {
    if (
      e.key === 'Enter' &&
      newInterest.trim() &&
      !interests.includes(newInterest.trim())
    ) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((item) => item !== interest));
  };

  const handleSaveInterests = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setErrorMessage('Unauthorized. Please login.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const payload = {
        interests,
      };

      await updateInterest(payload, token);
      setSuccessMessage('Interests updated successfully!');
      router.push('/profile');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to update interests.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] flex flex-col items-center sm:justify-center text-white">
      <div className="w-full max-w-sm mx-auto sm:rounded-xl pt-9 pb-7 sm:px-5 sm:shadow-lg">
        <div className="flex justify-between px-2 mb-7">
          <Link
            href="./"
            className="flex items-center gap-1 text-sm font-bold hover:opacity-70"
          >
            <FaAngleLeft className="size-5" />
            Back
          </Link>
          <button
            onClick={handleSaveInterests}
            className="text-sm font-bold text-liner-blue hover:opacity-70"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        {errorMessage && (
          <p className="mb-4 text-sm font-medium text-center text-red-500">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mb-4 text-sm font-medium text-center text-green-500">
            {successMessage}
          </p>
        )}

        <section className="px-6">
          <h1 className="px-2.5 mb-3 text-sm font-bold text-gold">
            Tell everyone about yourself
          </h1>
          <h1 className="px-2.5 mb-4 text-xl font-bold text-white">
            What interests you?
          </h1>

          <div className="flex flex-wrap items-center gap-2 px-4 py-3 mt-8 bg-[#D9D9D9] bg-opacity-5 rounded-lg">
            {interests.map((interest, index) => (
              <Tag
                key={index}
                label={interest}
                onRemove={() => handleRemoveInterest(interest)}
              />
            ))}
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={handleAddInterest}
              placeholder=""
              className="flex-grow min-w-[100px] text-sm text-white bg-transparent outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterestPage;
