"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from "react-icons/md";

/**
 * Back navigation button
 * @returns {JSX.Element}
 */
export default function BackNavBtn() {
  const router = useRouter();

  function handleClick() {
    router.back(); // Navigates one step back in the browser history
  }

  return (
    <button type="button" onClick={handleClick} className='actionBarBack'>
      <MdArrowBack />
    </button>
  );
}