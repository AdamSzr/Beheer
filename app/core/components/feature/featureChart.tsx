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
import { ChartDataAdapter, DataAdapter, ExecutionData, PostExecutionData } from "app/core/models/model"
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type FeatureChartProps = {
  adapter: DataAdapter
  onSelected?: () => void
}

const FeatureChart = (props: FeatureChartProps) => {

  const adapter = props.adapter
  const toPresent = adapter.prepareChartData(adapter.last30Days)

  const [title, setTitle] = useState("Wykres")

  const data = {
    labels: toPresent.data.map((i) => i.label), // dataToPresent
    datasets: [
      {
        label: "ilość uruchomień",
        data: toPresent.data.map((i) => i.countOfExecutions), // dataToPresent
        fill: false,
        borderColor: "rgb(255, 22, 132)",
        backgroundColor: "rgb(255,255,255)",
        events: [],
      },
      {
        label: "ilość pomyślnych uruchomień kodu",
        data: toPresent.data.map((i) => i.countOfSuccess), // dataToPresent
        fill: false,
        borderColor: "rgb(77, 22, 132)",
        hidden:true,
        events: [],
      },
      {
        label: "ilość wyjątków",
        data: toPresent.data.map((i) => i.countOfErrors), // dataToPresent
        fill: false,
        hidden:true,
        borderColor: "rgb(170, 120, 12)",
        events: [],
      },
      {
        label: "ilość uruchomień nowego kodu",
        data: toPresent.data.map((i) => i.countOfTrueValue), // dataToPresent
        fill: false,
        hidden:true,
        borderColor: "rgb(255, 22, 23)",
        events: [],
      },
    ],
  }

  const options = {
    events: ["mousemove", "click"],
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          color: "#424949",
          borderWidth: 1,
        },
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          color: "#424949",
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      line: {
        borderWidth: 2.5,
        tension: 0.4,
        backgroundColor: "#fff",
      },
      point: {
        radius: 3,
      },
    },
  }

  return (
    <Box maxHeight={"60vh"}>
      <Chart
        type="line"
        data={data}
        options={options as any}
        id="feature_chart"
        onClick={() => console.log(123)}
        style={{ position: "relative", height: "40vh", width: "80vw" }}
      />

      {/* <Box>
          <FeatureStats data={data} />
        </Box> */}
    </Box>
  )
}

function GetChartPointData(event, elements, chart): ChartPointData {

  let dataPoint = new ChartPointData()
  dataPoint.label = chart.tooltip.dataPoints[0].label
  dataPoint.value = chart.tooltip.dataPoints[0].raw

  return dataPoint
}

class ChartPointData {
  label: string
  value: number

  parse = () => this.label + " " + this.value
}


export default FeatureChart
