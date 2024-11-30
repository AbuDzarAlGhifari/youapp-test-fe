import Link from 'next/link';
import React from 'react';
import { LuPencilLine } from 'react-icons/lu';

const Interest = ({ interests = [] }) => {
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
