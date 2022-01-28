import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.authorize(), async (id: number) => {
  const feature = await db.feature.delete({ where: { id } })
  console.log({ feature })
  return feature
})
