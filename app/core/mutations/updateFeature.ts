import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(async (update: any, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  if (update.where === undefined || update.data === undefined)
    throw Error("Update Feature failure, update structure is not valid")

  const feature = await db.feature.update(update)
  return feature
})
