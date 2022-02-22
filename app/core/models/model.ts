import { Randomfrom, RandomInt } from "app/utils/base"
import { DateAddDays } from "app/utils/time"
import faker from "faker"

export class Feature {
  id: number
  userId: number
  name: string
  uuid: string
  value: boolean
  createdAt: Date
  updatedAt: Date

  constructor(userId: number, name: string, value: boolean) {
    this.userId = userId
    this.name = name
    this.value = value
  }
}

export class PostExecutionData {
  uuid: string
  value: boolean
  main: ExecutionData
  replace: ExecutionData
  createdAt?: number

  static random(feature: Feature) {
    let x = new PostExecutionData()
    x.uuid = feature.uuid
    x.value = feature.value
    if (x.value) x.main = ExecutionData.random(x.value)
    else x.replace = ExecutionData.random(x.value)

    x.createdAt = DateAddDays(new Date(), RandomInt(-90,0)).getTime()

    return x
  }
}

export class ExecutionData {
  errors: string
  time: number
  status: "SUCCESS" | "FAILED" | "ERROR" | any
  isMain: boolean

  static random(featureValue: boolean) {
    let x = new ExecutionData()
    x.isMain = featureValue
    x.time = RandomInt(1, 50_000)
    x.status = Randomfrom(["SUCCESS", "ERROR"])
    if (x.status === "ERROR") x.errors = faker.git.commitMessage()

    return x
  }
}

// model ExecutionResult {
//   id        Int      @id @default(autoincrement())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   value   Boolean
//   uuid    String  @unique
//   feature Feature @relation(fields: [uuid], references: [uuid])
//   status  Status

//   executions Execution[]
// }

// model Execution {
//   id        Int      @id @default(autoincrement())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   errors    String
//   time      Decimal
//   status    Boolean
//   isMain    Boolean

//   ExecutionResult   ExecutionResult? @relation(fields: [executionResultId], references: [id])
//   executionResultId Int?
// }
