import { PostExecutionData } from "app/core/models/model"
import { Middleware } from "blitz"
import db from "db"
import saveExecDetails from "app/core/mutations/saveExecDetails"
import saveExecResult from "app/core/queries/feature/saveExecResult"

const GetFeatureValue: Middleware = async (req, res, next) => {
  console.log(">> Entered <<")

  if (req.method === "GET") {
    console.log(req.query.uuid)
    var x = await db.feature.findFirst({ where: { uuid: req.query.uuid as string } })
    console.log(x?.value ? x?.value : false)
    return res.status(202).json({ value: x?.value ? x?.value : false })
  }

  if (req.method === "POST") {
    const result = req.body as PostExecutionData
    console.log({ result })

    const postExecResult = await saveExecResult(result, null as any)
    console.log({ postExecResult })

    // const replace = await saveExecDetails(execResult.ReplaceExecution, null as any)
    // const withcode = await saveExecDetails(execResult.WithExecution, null as any)
    // console.log({ replace, withcode })
  }

  return res.status(404).json({ error: "This endpoint is available only for GET|POST method." })
}

export default GetFeatureValue
