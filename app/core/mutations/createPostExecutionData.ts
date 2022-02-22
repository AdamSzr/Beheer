import { resolver, NotFoundError } from "blitz"
import { PrismaClient, Prisma } from "@prisma/client"
import { z } from "zod"
import { PostExecutionData, ExecutionData } from "app/core/models/model"
import db from "db"

type ExecutionResult = {
  result: PostExecutionData
  createdAt?: Date
  updatedAt?: Date
}

export default resolver.pipe(async (execResult: ExecutionResult) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const prisma = new PrismaClient()
  console.log({ execResult })
  // const execDetailsCreate = [] as any
  const obj = execResult.result.value ? execResult.result.main : execResult.result.replace

  const exec = await db.executionResult.create({
    include: {
      executions: true,
    },
    data: {
      value: execResult.result.value,
      uuid: execResult.result.uuid,
      createdAt: execResult.createdAt,
      executions: {
        create: obj,
      },
    },
  })
  console.log({ exec })
  return exec
})
