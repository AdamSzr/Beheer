import { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeature from "app/core/queries/feature/getFeatureByIdOrName"
import deleteFeature from "app/core/mutations/deleteFeature"
import { Line } from "react-chartjs-2"
import { CreateArray, GenerateRandomString, RandomInt } from "app/utils/base"
import { CHART_COLORS, color, COLORS, namedColor } from "app/utils/chart/utils"
import { DateAddDays } from "app/utils/time"
import faker from "faker"
import { ExecutedWithStatus, PostExecDTO } from "app/core/models/model"
import { Box } from "@chakra-ui/layout"
import { Button, ButtonGroup } from "@chakra-ui/react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react"

const FeatureStats = (props) => {
  const data = props.data

  return (
    <>
      <Box id="TableContainer">
        <Table id="FeatureStatsTable" variant="unstyled">
          <Thead>
            <Tr>
              <Th> stats name </Th>
              <Th>SUCCESS</Th>
              <Th>REPLACED</Th>
              <Th>FAILED</Th>
            </Tr>
          </Thead>
          <Tbody>
            {CreateRow({ title: "executed times", data: [1, 2, 3] })}
            {CreateRow({ title: "executed procentage", data: [1, 2, 3] })}
            {CreateRow({ title: "Total", data: ["-", "-", 6] })}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

function CreateRow(row: DataRow) {
  return (
    <Tr>
      <Td>{row.title}</Td>
      {row.data.map((i) => (
        <Td key={RandomInt(0, 10000)}>{i}</Td>
      ))}
    </Tr>
  )
}

class DataRow {
  title: string
  data: string[] | number[] | any[]
}

export default FeatureStats
