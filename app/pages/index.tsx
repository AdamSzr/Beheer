import React, { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

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
} from "@chakra-ui/react"
import { makePublicRouterInstance } from "next/dist/client/router"
import { GenerateRandomString } from "app/utils/base"
import AboutPage from "./about"
import MenuWindow from "app/core/components/MenuWindow"
import { AppViews } from "app/lang/available"
import { useSession } from "blitz"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const FullScreen: BlitzPage = (props: any) => {
  const translation = props.lang.get(AppViews.home)
  // const session = useSession()
  // console.log({session})

  return (
    <Box minH="100vh" id="FullScreen">
      <Suspense fallback="Please wait. Loading...">
        <MenuWindow lang={props.lang}>
          <Text> {translation.welcome.text} </Text>
          <Text>{translation.explanation.text}</Text>
        </MenuWindow>
      </Suspense>
    </Box>
  )
}

FullScreen.authenticate = { redirectTo: "/login" }
FullScreen.getLayout = (page) => <Layout title="FeatureService">{page}</Layout>

export default FullScreen
