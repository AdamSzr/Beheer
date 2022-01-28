import { resolver, NotFoundError } from "blitz"
import { PrismaClient, Prisma } from "@prisma/client"
import { z } from "zod"
import { ExecuteDetails, PostExec, PostExecDTO } from "app/core/models/model"
import db from "db"

export default resolver.pipe(async (execResult: PostExec) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const prisma = new PrismaClient()
  console.log({ execResult })
  const execDetailsCreate = [] as any

  if (execResult.ReplaceExecution)
    execDetailsCreate.push(createPostExecDetailsStruct(execResult.ReplaceExecution))

  if (execResult.WithExecution)
    execDetailsCreate.push(createPostExecDetailsStruct(execResult.WithExecution))

  const exec = await db.execution.create({
    data: {
      flagValue: Boolean(execResult.FlagValue),
      flagKey: execResult.FlagKey,
      execDetails: {
        create: execDetailsCreate,
      },
    },
  })
  return exec
})

function createPostExecDetailsStruct(executeDetails) {
  const x = {
    time: executeDetails.Time,
    errors: JSON.stringify(executeDetails.Errors),
    isNewCode: executeDetails.IsNewCode.valueOf(),
    status: executeDetails.Status.valueOf(),
  }
  console.log(x)
  return x
}

// flagValue Boolean
// key       String
// feature   Feature @relation(fields: [key], references: [name])

// details ExecuteDetails[]
// User    User?            @relation(fields: [userId], references: [id])
// userId  Int?
