import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(async ({ id, name }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const feature =
    id != null
      ? await db.feature.findFirst({ where: { id } })
      : await db.feature.findFirst({ where: { name } })

  return feature
})
