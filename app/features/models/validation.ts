import { z } from "zod"

export const FeatureZod = z.object({
  userId: z.number(),
  name: z.string().min(5).max(255),
  value: z.boolean(),
})
