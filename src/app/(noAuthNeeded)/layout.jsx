"use client"

import Navbar from '@/app/components/Navbar'
import { useUser } from '@auth0/nextjs-auth0/client';

const DashboardLayout = ({ children }) => {

  const { user, error, isLoading } = useUser();
  let isAuth = false;

  if (user) {
    isAuth = true;
  }

  return (
    <>
      <Navbar isBasic={true} isAuth={isAuth} />
        {children}
    </>
  )
}

export default DashboardLayout