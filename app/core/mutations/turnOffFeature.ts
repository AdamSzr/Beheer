import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

type updateArgs = {
  where: object
  data: object
}

export default resolver.pipe(async (update: updateArgs, ctx) => {
  const feature = await db.feature.update(update as any)
  return feature
})
