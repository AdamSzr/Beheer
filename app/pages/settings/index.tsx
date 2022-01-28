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
  Badge,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import BorderComponent from "app/core/components/BorderComponent"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import MenuWindow from "app/core/components/MenuWindow"
import { AppViews } from "app/lang/available"

export const Settings = (props) => {
  const translation = props.lang.get(AppViews.settings)
  console.log({ translation })
  const currentUser = useCurrentUser()
  return (
    <Box>
      <Center>
        <BorderComponent
          items={
            <Box key="1">
              <Text fontSize="xl"> {translation.topic}</Text>
              <Box borderBottom={"1px solid #aaa"} marginBottom={"2vh"}></Box>
              <FormControl id="settingsForm">
                <FormLabel>{translation.inputEmail.description}</FormLabel>
                <Input placeholder={`${currentUser?.email}`} />
                <FormLabel>{translation.inputPassw.description}</FormLabel>
                <Input type={"password"} placeholder="*********" />
                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  onClick={() => {
                    console.error("handle settings change")
                  }}
                >
                  {translation.submit.text}
                </Button>
              </FormControl>
            </Box>
          }
        ></BorderComponent>
      </Center>
    </Box>

    // <BorderComponent className="item1234" text-align="left" style={{
    //   width: "fit-content",
    //   maxWidth: "90vw",
    //   textAlign: "left"
    // }} items={
    //   [
    //     <Box>
    //       <Box key="1234"><Badge > User ID: {currentUser?.id}</Badge></Box>
    //       <Box className="useElementSpacing" key="1234" >
    //         <Box>
    //           <Text style={textStyling}  >User name:</Text> <Input style={inputStyling} defaultValue={currentUser?.name as any}></Input>
    //         </Box>
    //         <Box>
    //           <Text style={textStyling} >Email: </Text><Input style={inputStyling} defaultValue={currentUser?.email as any}></Input>
    //         </Box>
    //       </Box >
    //       <Button key="1234" color="black" onClick={() => { console.log(1234) }}> zapisz</Button>
    //     </Box>
    //   ]} />
  )
}

const SettingsPage: BlitzPage = (props) => {
  const lang = (props as any).lang
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MenuWindow lang={lang}>
            <Settings lang={lang} />
          </MenuWindow>
        </Suspense>
      </div>
    </>
  )
}

SettingsPage.authenticate = true
SettingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SettingsPage
