import { Suspense } from "react"
import { Head, Link, Router, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeature from "app/core/queries/feature/getFeatureByIdOrName"
import deleteFeature from "app/core/mutations/deleteFeature"
import { Line } from "react-chartjs-2"
import { ChartData, ChartOptions } from "chart.js"
import { color } from "app/utils/chart/utils"
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
import { ArrowBackIcon } from "@chakra-ui/icons"

const BorderComponent = (props) => {
  return (
    <>
      <Center minH="100vh">
        <Box
          {...props.style}
          className={props.className}
          border="1px solid white"
          margin="20px 0 20px 0"
          padding={10}
          textAlign="center"
          borderRadius={10}
        >
          {props.children}
        </Box>
      </Center>
    </>
  )
}
export default BorderComponent
