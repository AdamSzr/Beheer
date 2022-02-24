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
import { ChartDataAdapter, ExecutionData, PostExecutionData } from "app/core/models/model"
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
  data: PostExecutionData[]
  onSelected?: () => void
}

const FeatureChart = (props: FeatureChartProps) => {
  // let postExecDTO = props.postExecDTOS as PostExecDTO[]
  // postExecDTO = postExecDTO.filter((i) => i.executedWithStatus == ExecutedWithStatus.FAILED)
  // postExecDTO = GetOnlyFromLastMonths(postExecDTO, 1)
  // postExecDTO = SortFeaturesByDate(postExecDTO)

  // const dataToPresent = PrepareDataToPresent(postExecDTO)

  const adapter = new ChartDataAdapter(props.data)
  const toPresent = adapter.prepareChartData(adapter.last30Days)

  const [title, setTitle] = useState("Wykres")
  // const [listOfSelected, setListOfSelected] = useState([] as ChartPointData[])
  // const onDataSelected = props.onSelected

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
        events: [],
      },
      {
        label: "ilość wyjątków",
        data: toPresent.data.map((i) => i.countOfErrors), // dataToPresent
        fill: false,
        borderColor: "rgb(170, 120, 12)",
        events: [],
      },
      {
        label: "ilość uruchomień nowego kodu",
        data: toPresent.data.map((i) => i.countOfTrueValue), // dataToPresent
        fill: false,
        borderColor: "rgb(255, 22, 23)",
        events: [],
      },
    ],
  }

  const options = {
    // maintainAspectRatio: true,
    // responsive: true,
    events: ["mousemove", "click"],
    interaction: {
      // picking line not dots.
      intersect: false,
      mode: "index",
    },
    onHover: (e, elements, chart) => {
      // console.log(e)
      // console.log({e,elements,chart})
      // console.log(e.chart.tooltip.dataPoints[0].label)
    },
    onClick: (e, elements, chart) => {
      // console.log(e)
      // console.log({from_day:e.})
      try {
        const selected = GetChartPointData(e, elements, chart)
        // console.log(selected.label)
        // console.log(listOfSelected.length)
        // setListOfSelected((acct) => acct.concat(selected))
        // setTitle((act) => {
        //   // console.log(listOfSelected.length)
        //   if (listOfSelected.length % 2 == 0) {
        //     return "Selected from: " + selected.label
        //   } else {
        //     // console.log(listOfSelected)
        //     // console.log(listOfSelected[listOfSelected.length - 1]?.label)
        //     const range = GetSelectedRange(
        //       postExecDTO,
        //       listOfSelected[listOfSelected.length - 1]?.label,
        //       selected.label
        //     )
        //     //TODO: Download this as JSON file.
        //     // console.log(range)
        //     onDataSelected(range)
        //     return (
        //       "Selected from: " +
        //       listOfSelected[listOfSelected.length - 1]?.label +
        //       "Selected to: " +
        //       selected.label
        //     )
        //   }
        // })
        // console.log(GetChartPointData(e, elements, chart))
      } catch (error) {
        console.error("Unable to pick a point")
      }
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

// function SortFeaturesByDate(featureList: PostExecDTO[]) {
//   return featureList.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
// }

// function GetOnlyFromLastMonths(featureList: PostExecDTO[], months = 1): PostExecDTO[] {
//   var lastMonthDate = DateAddDays(Date.now(), -30 * months)
//   return featureList.filter((item) => item.createdAt > lastMonthDate)
// }

// function PrepareDataToPresent(featureList: PostExecDTO[]) {
//   let dict = {}

//   featureList.forEach((item) => {
//     if (dict[item.createdAt.toLocaleDateString("pl-PL")] === undefined)
//       dict[item.createdAt.toLocaleDateString("pl-PL")] = 0

//     dict[item.createdAt.toLocaleDateString("pl-PL")] =
//       dict[item.createdAt.toLocaleDateString("pl-PL")] + 1
//   })
//   return dict
// }

// function ParseStringToDate(dateString: string): Date {
//   const [day, month, year] = dateString.split(".") as any
//   return new Date(Number(year), Number(month) - 1, Number(day))
// }

// function GetSelectedRange(dto: PostExecDTO[], from: string | undefined, to: string): PostExecDTO[] {
//   // console.log(dto)

//   // console.log({from})
//   // console.log({to})
//   const dateFrom = ParseStringToDate(from as any)
//   const dateTo = ParseStringToDate(to)
//   // console.log({dateFrom,dateTo})
//   const items = dto.filter((item) => {
//     const time = item.createdAt
//     return time >= dateFrom && time < dateTo
//   })
//   // console.log(items)
//   return items
// }

function GetChartPointData(event, elements, chart): ChartPointData {
  // console.log(event,elements)
  // console.log(chart.tooltip.dataPoints[0].label)
  // console.log(chart.tooltip.dataPoints[0].raw)
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

class MinMaxFromDataSet {
  min: Date
  max: Date
}

export default FeatureChart
