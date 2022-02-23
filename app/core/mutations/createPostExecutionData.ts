import { resolver, NotFoundError } from "blitz"
import { PrismaClient, Prisma } from "@prisma/client"
import { z } from "zod"
import { PostExecutionData, ExecutionData } from "app/core/models/model"
import db from "db"


export default resolver.pipe(async (execResult: PostExecutionData) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const prisma = new PrismaClient()
  console.log({ execResult })
  // const execDetailsCreate = [] as any
  const obj = execResult.value ? execResult.main : execResult.replace

  const exec = await db.executionResult.create({
    include: {
      executions: true,
    },
    data: {
      value: execResult.value,
      uuid: execResult.uuid,
      executions: {
        create: obj,
      },
    },
  })
  console.log({ exec })
  return exec
})
