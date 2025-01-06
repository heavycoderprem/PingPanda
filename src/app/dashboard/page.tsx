import { DashboardPage } from '@/components/dashboard-page'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import DashboardPageContent from './dashboard-page-content'
import { CreateEventCategoryModal } from '@/components/create-event-category-modal'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'


const page = async () => {
  const { getUser } = getKindeServerSession()
  const auth = await getUser()
 if(!auth) {
    redirect("/sign-in")
 }

 const user = db.user.findUnique({
  where: {
    externalId: auth.id
  }
 })

 if(!user) {
  redirect("/sign-in")
 }
  return (
    <div>
      <DashboardPage title='Dashboard' cta={
        <CreateEventCategoryModal>
          <Button>
            <PlusIcon className='size-4 mr-2'/>
            Add Category
          </Button>
        </CreateEventCategoryModal>
      }> 
       <DashboardPageContent/>

      </DashboardPage>
    </div>
  )
}

export default page
