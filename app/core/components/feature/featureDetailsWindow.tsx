import { Box, Button, Flex, Spacer } from "@chakra-ui/react"
import { useState } from "react"
import FeatureChart from "./featureChart"

type FeatureDetailsWindowProps = {}

const FeatureDetailsWindow = (props: FeatureDetailsWindowProps) => {
  const [Item, setItem] = useState(<FeatureChart />)

  const components = {
    x: <FeatureChart />,
    y: <Box> </Box>,
  }

  return (
    <Box id="featureDetailWindow">
      <Box id="featureDetailView">
        <Box id="featureDetailViewBorder">
          <Flex id="featureDetailsMenu">
            <Spacer />
            <Button colorScheme="teal" className="featureMenuButton">
              Wykres
            </Button>
            <Spacer />
            <Button colorScheme="teal" className="featureMenuButton">
              Statystyki
            </Button>
            <Spacer />
          </Flex>

          <Box id="featureDetailsContainer">{<FeatureChart />}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FeatureDetailsWindow
