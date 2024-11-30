'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';

const InterestPage = () => {
  const [interests, setInterests] = useState([
    'Music',
    'Basketball',
    'Fitness',
    'Gymming',
  ]);
  const [newInterest, setNewInterest] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] flex flex-col items-center sm:justify-center text-white">
      <div className="w-full max-w-sm mx-auto sm:rounded-xl pt-9 pb-7 sm:px-5 sm:shadow-lg">
        {/* Header */}
        <div className="flex justify-between px-2 mb-7 ">
          <Link
            href="./"
            className="flex items-center gap-1 text-sm font-bold hover:opacity-70"
          >
            <FaAngleLeft className="size-5" />
            Back
          </Link>
          <h1 className="text-sm font-semibold text-blue-300">Save</h1>
        </div>

        <section className="px-9">
          <h1 className="mb-3 text-sm font-bold text-yellow-100">
            Tell everyone about yourself
          </h1>
          <h1 className="mb-4 text-xl font-bold text-white">
            What interests you?
          </h1>

          {/* Tag Input */}
          <div className="flex flex-wrap items-center gap-2 px-4 py-3 mt-8 bg-[#D9D9D9] bg-opacity-5 rounded-lg">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-white rounded-md bg-opacity-10"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="text-white hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add New Interest */}
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={handleAddInterest}
              className="flex-grow text-sm text-white bg-transparent min-h-9 focus:outline-none "
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterestPage;
