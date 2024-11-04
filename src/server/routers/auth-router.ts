import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { router } from "../__internals/router"
import { publicProcedure } from "../procedures"
import { db } from "@/db"

export const authRouter = router({
  test: publicProcedure.query(async ({c}) => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
      return c.json({ isSynced: false })
    }

    const dbUser = await db.user.findFirst({
      where: {
        externalId: user.id,
      },
    })
    console.log("USER IN DB: ", dbUser)

    if (!dbUser) {
      await db.user.create({
        data: {
          quotaLimit: 100,
          email: user.email ?? "no-email@placeholder.com",
          externalId: user.id,
        },
      })
    }
    return c.json({ isSynced: true })
  }),
})
