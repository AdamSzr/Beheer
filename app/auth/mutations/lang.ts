import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Login } from "../validations"
import { Role } from "types"
import { Lang } from "app/lang/available"

export default resolver.pipe(async (i, ctx) => {
  // This throws an error if credentials are invalid
  await ctx.session.$setPublicData({ lang: "PL" } as any)
})
