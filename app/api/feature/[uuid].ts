import { PostExecutionData } from "app/core/models/model"
import { Middleware } from "blitz"
import db from "db"
import createPostExecutionData from "app/core/mutations/createPostExecutionData"
import { MailOptions } from "app/core/models/model"
import getUserByFeatureUUID from "app/core/queries/getUserByFeatureUUID"
import Gmail from "integrations/gmail"
import turnOffFeature from "app/core/mutations/turnOffFeature"

const GetFeatureValue: Middleware = async (req, res, next) => {
  console.log(">> Entered <<")

  if (req.method === "GET") {
    console.log(req.query.uuid)
    var x = await db.feature.findFirst({ where: { uuid: req.query.uuid as string } })
    console.log({ value: x?.value ? x?.value : false, name: x?.name })
    return res.status(202).json({ value: x?.value ? x?.value : false, name: x?.name })
  }

  if (req.method === "POST") {
    const result = req.body as PostExecutionData
    console.log({ result })

    const postExecResult = await createPostExecutionData(result, null as any)
    console.log({ postExecResult })

    if (postExecResult.value == true && postExecResult.executions?.errors != null) {
      await turnDownFeature(postExecResult)
    }

    return res.status(201).json(postExecResult)
  }

  return res.status(404).json({ error: "This endpoint is available only for GET|POST method." })
}

async function turnDownFeature(postExecResult: any) {
  const featureWithUser = (await getUserByFeatureUUID(postExecResult.uuid)) as any
  console.log({ featureWithUser })

  await turnOffFeature(
    { where: { uuid: featureWithUser.uuid }, data: { value: false } },
    null as any
  )
  await sendMail(featureWithUser.user.email, featureWithUser.name)
}

async function sendMail(email: string, featureName: string) {
  const options = new MailOptions(email, featureName)
  Gmail.send(options)
}

export default GetFeatureValue
