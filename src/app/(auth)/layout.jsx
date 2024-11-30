'use client';

import Link from 'next/link';
import { FaAngleLeft } from 'react-icons/fa6';

const AuthLayouts = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#1F4247] via-[#0D1D23] to-[#09141A] flex flex-col items-center sm:justify-center text-white">
      <div className="w-full max-w-sm mx-auto pt-9 sm:shadow-lg sm:rounded-xl">
        <Link
          href="./"
          className="flex items-center gap-1 px-5 text-sm font-bold sm:px-7 hover:opacity-70"
        >
          <FaAngleLeft className="size-5" />
          Back
        </Link>

        <div className="w-full max-w-sm mx-auto mt-14 sm:px-5">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayouts;
