import { Box, Button, Flex, Spacer } from "@chakra-ui/react"
import { useState } from "react"
import FeatureChart from "./featureChart"
import FeatureStats from "./featureStats"
import getAllExecutuionData from "app/core/queries/postExecutuionData/getAllExecutionData"
import { useQuery } from "blitz"
import getFeatureByIdOrName from "app/core/queries/feature/getFeatureByIdOrName"
import { Feature } from "app/core/models/model"

type FeatureDetailsWindowProps = {
  feature: Feature
}

const FeatureDetailsWindow = (props: FeatureDetailsWindowProps) => {
  const items = useQuery(getAllExecutuionData, { uuid: props.feature.uuid })[0] as any

  // console.log(items)

  class Components {
    public static CHART = (<FeatureChart data={items} />)
    public static STATS = (<FeatureStats data={items} />)
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
