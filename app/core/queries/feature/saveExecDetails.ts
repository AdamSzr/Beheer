import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"
import { ExecuteDetails, PostExec } from "../models/model"

export default resolver.pipe(async (executeDetails: ExecuteDetails) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const exec = await db.executeDetails.create({
    data: createPostExecDetailsStruct(executeDetails),
  })
  return exec
})

function createPostExecDetailsStruct(executeDetails) {
  console.log("-->", {
    time: executeDetails.Time,
    errors: JSON.stringify(executeDetails.Errors),
    isNewCode: executeDetails.IsNewCode.valueOf(),
    status: executeDetails.Status.valueOf(),
  })
  return {
    time: executeDetails.Time,
    errors: JSON.stringify(executeDetails.Errors),
    isNewCode: executeDetails.IsNewCode.valueOf(),
    status: executeDetails.Status.valueOf(),
  }
}

// Time: number
//   Errors: string[]
//   Result: string
// model ExecuteDetails {
//     id        Int      @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     status      String
//     errors      String
//     result      String
//     time        Decimal
//     executionId Int
//     execution   Execution @relation(fields: [executionId], references: [id])

//   }
