'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { LuPencilLine } from 'react-icons/lu';
import { toast } from 'react-hot-toast';
import { getInterest } from '@/services/interest';

const Interest = ({ initialInterests = [] }) => {
  const [interestList, setInterestList] = useState(initialInterests);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          toast.error('Unauthorized. Please login.');
          return;
        }

        const profile = await getInterest(token);
        setInterestList(profile?.interests || []);
      } catch (error) {
        toast.error(error || 'Failed to fetch interests.');
      }
    };

    fetchInterests();
  }, []);

  return (
    <div className="h-auto bg-[#0E191F] px-7 pt-4 pb-7 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-medium text-white">Interest</h1>
        <Link href="./profile/interest">
          <LuPencilLine className="text-white cursor-pointer" />
        </Link>
      </div>
      {interestList.length === 0 ? (
        <p className="text-sm font-medium text-white text-opacity-45">
          Add in your interests to find a better match
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {interestList.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium text-white bg-[#172C35] rounded-full"
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
