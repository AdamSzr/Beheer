import { PostExecutionData } from "app/core/models/model"
import saveExecResult from "app/core/queries/feature/saveExecResult"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const NUMBER_OF_EXECUTION_PER_FEATURE = 30

const seed = async () => {
  const featues = await db.feature.findMany({ where: { userId: 1 } })
  console.log(featues)

  featues.forEach(async (element) => {
    for (let index = 0; index < NUMBER_OF_EXECUTION_PER_FEATURE; index++) {
      const postExecData = PostExecutionData.random(element)
      await saveExecResult(postExecData, null as any)
    }
  })


}

export default seed
