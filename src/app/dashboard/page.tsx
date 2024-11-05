import { DashboardPage } from '@/components/dashboard-page'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
 
  return (
    <div>
      <DashboardPage title='Dashboard'>
        <DashboardPageContent/>

      </DashboardPage>
    </div>
  )
}

export default page
