import { resolver } from "blitz"
import db, { Prisma } from "db"

export default resolver.pipe(resolver.authorize(), async ({ uuid }) => {
  console.log({ uuid })

  const details = await db.executionResult.findMany({
    where: { uuid: uuid },
    include: { executions: true },
  })

  return details
})
