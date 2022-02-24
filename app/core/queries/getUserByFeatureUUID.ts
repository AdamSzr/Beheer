import { Ctx } from "blitz"
import db from "db"

export default async function getUserByFeatureUUID(uuid: string) {
  const result = await db.feature.findFirst({ where: { uuid: uuid }, include: { user: true } })

  return result
}
