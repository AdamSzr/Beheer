import { Suspense, useState } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  useQuery,
  BlitzPage,
  Routes,
  useMutation,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeatures from "app/features/queries/getFeatures"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { GenerateRandomString, RandomInt } from "app/utils/base"
import { Feature } from "../models/model"
import updateFeature from "app/features/mutations/updateFeature"

import { Box, Center, GridItem, Text } from "@chakra-ui/layout"
import {
  Badge,
  Switch,
  Icon,
  Td,
  useControllableState,
  useControllableProp,
   Input, IconButton,   Heading,
   FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Tr,
} from "@chakra-ui/react"

import { DeleteIcon, InfoIcon } from "@chakra-ui/icons"

const FeatureView = (props) => {
  const feature = props.item as Feature
  const removeCb = props.deleteCallback
  const updateCb = props.updateCallback
  const switchInitState = feature.value

  // const [controlableValue, setCtrlValue] = useControllableState({ defaultValue: feature.value })


  // console.log({feature})

  function deleteFeature(e: any, feature: Feature) {
    removeCb(feature.id)
    console.log({ e, feature })
  }

  function updateFeature(e: any,feature: Feature) {
    // console.log({feature})
    updateCb(feature, e)
  }

  return (
    <Tr className="featureTableRow">
      <Link href={Routes.ShowFeaturePage({ featureId: feature.id })}>
        <Td maxWidth="40vw">{feature.name}</Td>
      </Link>
      <Td width="fit-content">
        <Center>
            <FormControl >
              <Switch
                id="switch_box"
                size="md"
                isChecked={switchInitState}
                onChange={(e) => {
                  // console.log({feature})
                  updateFeature(e,feature)
                }}
              />
            </FormControl>

        </Center>
      </Td>
      <Td>
        <Center>
          <IconButton
            icon={<DeleteIcon />}
            onClick={(e) => deleteFeature(e, feature)}
            textColor="black"
            colorScheme="red"
            aria-label=""
          />
        </Center>
      </Td>
    </Tr>
  )
}

export default FeatureView
