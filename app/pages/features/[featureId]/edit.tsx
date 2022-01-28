import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeature from "app/core/queries/feature/getFeatureByIdOrName"
import updateFeature from "app/core/mutations/updateFeature"

const EditFeature = () => {
  const router = useRouter()
  const featureId = useParam("featureId", "number")

  const feature = useQuery(getFeature, { id: featureId })
  const [updateFeatureMutation] = useMutation(updateFeature)

  const Modify = () => {
    if (featureId) updateFeatureMutation({ id: featureId, value: !feature[0]?.value })
  }

  return (
    <>
      <Head>
        <title>Edit Feature </title>
      </Head>

      <div>
        {/* {JSON.stringify(feature)} */}
        {JSON.stringify(feature[0]?.value)}
        <button onClick={Modify}>Change to {JSON.stringify(!feature[0]?.value)}</button>
      </div>
    </>
  )
}

const EditFeaturePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFeature />
      </Suspense>
    </div>
  )
}

EditFeaturePage.authenticate = true
EditFeaturePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditFeaturePage
