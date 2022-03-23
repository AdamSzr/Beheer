import { ExecutionData, PostExecutionData } from "app/core/models/model"
import createPostExecutionData from "app/core/mutations/createPostExecutionData"
import { DateAddDays, randomDate } from "app/utils/time"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const NUMBER_OF_EXECUTION_PER_FEATURE = 165

async function saveCustomPostExecutionData(data: PostExecutionData, createdAt: number | Date) {
  console.log({ data })

  const exec = await db.executionResult.create({
    include: {
      executions: true,
    },
    data: {
      value: data.value,
      uuid: data.uuid,
      createdAt: new Date(createdAt),
      executions: {
        create: data.execution,
      },
    },
  })
  // console.log({ exec })
  return exec
}

const seed = async () => {
  const userEmail = ""
  const user = await db.user.findFirst({ where: { email: userEmail } })
  const featues = await db.feature.findMany({ where: { userId: user?.id } })

  featues.map(async (element) => {
    for (let index = 0; index < NUMBER_OF_EXECUTION_PER_FEATURE; index++) {
      const postExecData = PostExecutionData.random(element)

      await saveCustomPostExecutionData(
        postExecData,
        randomDate(DateAddDays(new Date(), -50), new Date())
      )
    }
  })
  console.log(">> DONE <<")
}

export default seed
