import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { userAgent } from "next/server"



const page = async () => {
    const { getUser } = getKindeServerSession()
    const auth = await getUser()

    if(!auth) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: {externalId: auth.id},
    })

    if(!user) {
        redirect("/sign-in")
    }

    return 
    <DashboardPage title="Pro Membership">
        <UpgradePageContent/>

    </DashboardPage>
}

export default page
