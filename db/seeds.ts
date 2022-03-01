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
const NUMBER_OF_EXECUTION_PER_FEATURE = 3_000

async function saveCustomPostExecutionData(data: PostExecutionData, createdAt: number | Date) {
  console.log({ data })
  // const execDetailsCreate = [] as any
  const obj = data.value ? data.main : data.replace

  const exec = await db.executionResult.create({
    include: {
      executions: true,
    },
    data: {
      value: data.value,
      uuid: data.uuid,
      createdAt: new Date(createdAt),
      executions: {
        create: obj,
      },
    },
  })
  // console.log({ exec })
  return exec
}

const seed = async () => {
  const featues = await db.feature.findMany({ where: { userId: 1 } })

  featues.map(async (element) => {
    for (let index = 0; index < NUMBER_OF_EXECUTION_PER_FEATURE; index++) {
      const postExecData = PostExecutionData.random(element)

      await saveCustomPostExecutionData(
        postExecData,
        randomDate(DateAddDays(new Date(), -365), new Date())
      )
    }
  })
  console.log(">> DONE <<")
}

export default seed
