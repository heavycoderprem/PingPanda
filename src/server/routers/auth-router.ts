import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({c}) => {
    const { getUser } = getKindeServerSession()
    const auth = await getUser()
    if(!auth) {
      return c.json({isSynced: false})
    }

    
    const user = await db.user.findFirst({
      where: {externalId: auth.id},
    })
    if(!user) {
      await db.user.create({
        data: {
          quotaLimit: 100,
          externalId: auth.id,
          email: auth.email ?? "no-email@example.com",
        },
      })
    }


    return c.json({isSynced: true})
  })
})