import { Box, Button, Center, Flex, Spacer } from "@chakra-ui/react"
import { useState } from "react"
import FeatureChart from "./featureChart"
import FeatureStats from "./featureStats"
import getAllExecutuionData from "app/core/queries/postExecutuionData/getAllExecutionData"
import { useQuery } from "blitz"
import getFeatureByIdOrName from "app/core/queries/feature/getFeatureByIdOrName"
import { TableDataAdapter, Feature } from "app/core/models/model"

type FeatureDetailsWindowProps = {
  feature: Feature
}

const FeatureDetailsWindow = (props: FeatureDetailsWindowProps) => {
  const items = useQuery(getAllExecutuionData, { uuid: props.feature.uuid })[0] as any

  const adapter = new TableDataAdapter(items)
  // console.log(items)

  class Components {
    public static CHART = (
      <Center id="chartFlex">
        <FeatureChart adapter={adapter} />
      </Center>
    )
    public static STATS = (<FeatureStats adapter={adapter} />)
  }
  const [displayChart, setDisplayChart] = useState(Components.CHART as any)

  return (
    <Box id="featureDetailWindow">
      <Box id="featureDetailView">
        <Box id="featureDetailViewBorder">
          <Flex id="featureDetailsMenu">
            <Spacer />
            <Button
              colorScheme="teal"
              className="featureMenuButton"
              onClick={() => setDisplayChart(Components.CHART)}
            >
              Wykres
            </Button>
            <Spacer />
            <Button
              colorScheme="teal"
              className="featureMenuButton"
              onClick={() => setDisplayChart(Components.STATS)}
            >
              Statystyki
            </Button>
            <Spacer />
          </Flex>

          <Box id="featureDetailsContainer">{displayChart}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FeatureDetailsWindow
