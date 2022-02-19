import { Suspense } from "react"
import { Head, Link, Router, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeature from "app/core/queries/feature/getFeatureByIdOrName"
import deleteFeature from "app/core/mutations/deleteFeature"
import { Line } from "react-chartjs-2"
import { ChartData, ChartOptions } from "chart.js"
import { color } from "app/utils/chart/utils"
import { CreatePostExecDTOBasedOnStaticData, GetStaticFeatures } from "app/core/models/faker"
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
import { PostExecDTO } from "app/core/models/model"
import { ENABLE_SAVING_CHART_DATA } from "app/config"

const Feature = (props) => {
  const featureId = useParam("featureId", "number")
  const featuresExecDTO = CreatePostExecDTOBasedOnStaticData(1000)

  // TODO: dodać tabelkę - statystyki
  //console.log(featuresExecDTO)
  //useQuery(getFeature,{id:featureId})
  // const [deleteFeatureMutation] = useMutation(deleteFeature)

  const [feature] = useQuery(getFeature, { id: featureId })
  return (
    <>
      <FeatureChart
        postExecDTOS={featuresExecDTO}
        onSelected={(execDtos) => {
          console.log(execDtos)
          downloadData(execDtos)
        }}
      />
    </>
  )
}

function getFormatedDate(dto: PostExecDTO): string {
  const date = dto.createdAt
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}

function downloadData(data: PostExecDTO[]) {
  if (!ENABLE_SAVING_CHART_DATA) return

  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  var url = URL.createObjectURL(blob)
  const aElement = document.createElement("a")
  aElement.download = `${getFormatedDate(data[0] as any)}_TO_${getFormatedDate(
    data[data.length - 1] as any
  )}`
  aElement.href = url
  document.body.appendChild(aElement)
  aElement.click()
  document.body.removeChild(aElement)
}

const ShowFeaturePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <IconButton
          aria-label=""
          onClick={() => Router.back()}
          icon={<ArrowBackIcon />}
          position="absolute"
          left="2vh"
          top="2vh"
          colorScheme="teal"
          variant="outline"
        />
        <IconButton
          aria-label=""
          onClick={() => Router.back()}
          icon={<ChevronDownIcon />}
          position="absolute"
          right="2vh"
          top="2vh"
          colorScheme="teal"
          variant="outline"
        />
        <Feature response={null} />
        {/* <FakerData /> */}
      </Suspense>
    </div>
  )
}

ShowFeaturePage.authenticate = true
ShowFeaturePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowFeaturePage
