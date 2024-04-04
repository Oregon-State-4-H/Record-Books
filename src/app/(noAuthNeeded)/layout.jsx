import Navbar from '@/app/components/Navbar'
import { getSession } from "@auth0/nextjs-auth0";


const DashboardLayout = async ({ children }) => {

  const session = await getSession();
  let isAuth = false;

  if (session?.user) {
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