import { resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(resolver.authorize(), async ({ userId }) => {
  console.log({ userId })

  const feature = await db.feature.findMany({ where: { userId } })

  return feature
})
