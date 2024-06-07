import Navbar from '@/app/components/Navbar'
import { Suspense } from 'react'

const DashboardLayout = ({ children }) => {
  return (
    <>
        <Navbar />
        <Suspense>
          {children}
        </Suspense>
    </>
  )
}

export default DashboardLayout