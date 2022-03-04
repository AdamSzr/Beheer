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
  ChartData,
} from "chart.js"
import { Chart } from "react-chartjs-2"
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import { DataAdapter, PostExecutionData } from "app/core/models/model"
import { number } from "zod"

type FeatureStatsProps = {
  adapter: DataAdapter
}

const FeatureStats = (props: FeatureStatsProps) => {
  const adapter = props.adapter
  // console.log({ adapter })

  function calcProcentage(value: number, total: number) {
    return ` (${((total / value).toFixed(2) as any) * 100}%)`
  }

  return (
    <>
      <Box id="TableContainer">
        <Table id="FeatureStatsTable" variant="unstyled">
          <Tbody>
            {CreateRow({
              title: "Ilość uruchomień kodu",
              data: [adapter.getTotalCountOfExecution()],
            })}
            {CreateRow({
              title: "Ilość uruchomień nowego kodu",
              data: [
                adapter.newCodeExecCount() +
                  calcProcentage(adapter.getTotalCountOfExecution(), adapter.newCodeExecCount()),
              ],
            })}
            {CreateRow({
              title: "Ilość uruchomień starego kodu",
              data: [
                adapter.oldCodeExecCount() +
                  calcProcentage(adapter.oldCodeExecCount(), adapter.newCodeExecCount()),
              ],
            })}
            {CreateRow({
              title: "Ilość pomyślnych uruchomień kodu",
              data: [
                adapter.countOfSuccesfullyRunned() +
                  calcProcentage(adapter.countOfSuccesfullyRunned(), adapter.newCodeExecCount()),
                ,
              ],
            })}
            {CreateRow({
              title: "Ilość negatywnych uruchomień kodu",
              data: [
                adapter.countOfErrorRunned() +
                  calcProcentage(adapter.countOfErrorRunned(), adapter.newCodeExecCount()),
              ],
            })}
            {CreateRow({
              title: "Najwięcej wykonań kodu",
              data: [adapter.getMostIntenseDay()],
            })}
            {CreateRow({
              title: "Najmniej wykonań kodu",
              data: [adapter.getMostLazyeDay()],
            })}
            {CreateRow({
              title: "Średni czas wykonywania kodu",
              data: [adapter.getAvgTime()],
            })}

            {CreateRow({ title: "Total", data: ["-"] })}
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
