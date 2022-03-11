import { Suspense } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  BlitzPage,
  Routes,
  Router,
  useMutation,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import BorderComponent from "app/core/components/BorderComponent"
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
  OrderedList,
  ListItem,
  UnorderedList,
  HStack,
  Code,
  Switch,
} from "@chakra-ui/react"
import AppSettings from "app/core/settings"
import { QuestionIcon } from "@chakra-ui/icons"
import { GenerateRandomString } from "app/utils/base"
import AboutPage from "app/pages/about/index"
import FeaturesPage from "app/pages/features/index"
import { useState } from "react"
import SettingsPage from "../../pages/settings"
import logout from "app/auth/mutations/logout"
import { AppViews, Lang } from "app/lang/available"
import { MULTI_LANGUAGE } from "app/config"

const MenuWindow = (props) => {
  const [logoutMutation] = useMutation(logout)
  // console.log({props})
  const updateLang = props.lang.update
  const translation = props.lang.get(AppViews.menu)
  console.log(props.lang.currentLang)

  const insideComponent = props.children
  // console.log(insideComponent)

  async function LogoutUser() {
    await logoutMutation()
    Router.push("/login")
  }

  return (
    <Box id="BackgroundBoard">
      <Box id="Menu">
        <HStack id="MenuPanelStack">
          <Text onClick={() => Router.push("/")}>{translation.home.name}</Text>
          <Text onClick={() => Router.push("/features")}>{translation.features.name}</Text>
          <Text onClick={() => Router.push("/settings")}>{translation.settings.name}</Text>
          <Text onClick={() => Router.push("/about")}>{translation.about.name}</Text>
          <Spacer />
          {MULTI_LANGUAGE ? <span id="Language_switch"> PL<Switch onChange={updateLang} isChecked={props.lang.currentLang==Lang.PL?false:true} />EN</span>: ""}
          <Text id="LogoutButton" onClick={LogoutUser}>{translation.logout.name}</Text>
        </HStack>
      </Box>
      <Box id="Content">{insideComponent}</Box>
    </Box>
  )
}

export default MenuWindow
