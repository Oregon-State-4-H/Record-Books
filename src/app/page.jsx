"use client";

import Navbar from './components/Navbar'
import { useUser } from '@auth0/nextjs-auth0/client';


export default function Home() {
  const { user, error, isLoading } = useUser();
  let isAuth = false;

  if (user) {
    isAuth = true;
  }

  return (
    <>
      <Navbar isBasic={true} isAuth={isAuth} />
      <main>
        <h1>Pubic Start Site</h1>
      </main>
    </>
  )
}