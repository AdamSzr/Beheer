import { PostExec } from "app/features/models/model"
import { Middleware } from "blitz"
import db from "db"
import saveExecDetails from "app/features/queries/saveExecDetails"
import saveExecResult from "app/features/queries/saveExecResult"

const GetFeatureValue: Middleware = async (req, res, next) => {
  if (req.method === "GET") {
    console.log(req.query.key)
    var x = await db.feature.findFirst({ where: { name: req.query.key as string } })
    console.log(x?.value ? x?.value : false)
    return res.status(202).json({ value: x?.value ? x?.value : false })
  }

  if (req.method === "POST") {
    const execResult = JSON.parse(req.body) as PostExec

    console.log({ execResult })
    const postExecResult = await saveExecResult(execResult, null as any)
    // console.log(postExecResult)

    // const replace = await saveExecDetails(execResult.ReplaceExecution, null as any)
    // const withcode = await saveExecDetails(execResult.WithExecution, null as any)
    // console.log({ replace, withcode })
  }

  return res.status(404).json({ error: "This endpoint is available only for GET|POST method." })
}

export default GetFeatureValue
