import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { Feature } from "../models/model"

export default resolver.pipe(resolver.authorize(), async (input: Feature) => {
  console.log(input)
  const feature = await db.feature.create({ data: input })

  return feature
})
