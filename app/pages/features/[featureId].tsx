import { Suspense } from "react"
import { Head, Link, Router, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeature from "app/core/queries/feature/getFeatureByIdOrName"
import deleteFeature from "app/core/mutations/deleteFeature"
import { Line } from "react-chartjs-2"
import { ChartData, ChartOptions } from "chart.js"
import { color } from "app/utils/chart/utils"
// import { CreatePostExecDTOBasedOnStaticData, GetStaticFeatures } from "app/core/models/faker"
import { DateAddDays } from "app/utils/time"
import FeatureChart from "app/core/components/feature/featureChart"

import {
  Button,
  Center,
  Grid,
  Image,
  Flex,
  GridItem,
  Box,
  Heading,
  Spacer,
  Text,
  IconButton,
} from "@chakra-ui/react"
import { ArrowBackIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { PostExecutionData, Feature} from "app/core/models/model"
import { ENABLE_SAVING_CHART_DATA } from "app/config"
import FeatureDetailsWindow from "app/core/components/feature/featureDetailsWindow"

// function getFormatedDate(dto: PostExecutionData): string {
//   const date = dto.createdAt
//   return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
// // }

// function downloadData(data: PostExecutionData[]) {
//   if (!ENABLE_SAVING_CHART_DATA) return

//   var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
//   var url = URL.createObjectURL(blob)
//   const aElement = document.createElement("a")
//   aElement.download = `${getFormatedDate(data[0] as any)}_TO_${getFormatedDate(
//     data[data.length - 1] as any
//   )}`
//   aElement.href = url
//   document.body.appendChild(aElement)
//   aElement.click()
//   document.body.removeChild(aElement)
// }

const ShowFeaturePage: BlitzPage = () => {
  // const feature = (await useQuery(getFeatureByIdOrName, { id: props.featureId })) as any
  // const items = await useQuery(getAllExecutuionData, { uuid: feature.uuid })
  // console.log({ items })
  // const featuresBase = useQuery(getFeatures, { userId: currentUser?.id })[0]

  const featureId = useParam("featureId", "number")

  const [feature] = useQuery(getFeature, { id: featureId })
  console.log({ feature })
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <IconButton
        aria-label=""
        onClick={() => Router.back()}
        icon={<ArrowBackIcon />}
        position="absolute"
        left="2vh"
        top="2vh"
        colorScheme="teal"
        variant="outline"
      /> */}
      <FeatureDetailsWindow feature={feature as Feature} />
      {/* <Feature response={null} /> */}
    </Suspense>
  )
}

ShowFeaturePage.authenticate = { redirectTo: "/login" }
ShowFeaturePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowFeaturePage
