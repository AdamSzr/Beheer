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
import getFeatures from "app/core/queries/feature/getFeatures"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { GenerateRandomString, RandomInt } from "app/utils/base"
import { Feature } from "app/core/models/model"
import updateFeature from "app/core/mutations/turnOffFeature"

import { Box, Center, GridItem, Text } from "@chakra-ui/layout"
import {
  Badge,
  Switch,
  Icon,
  Td,
  useControllableState,
  useControllableProp,
  Input,
  IconButton,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Tr,
  useClipboard,
  Button,
} from "@chakra-ui/react"

import { CopyIcon, DeleteIcon, InfoIcon, LinkIcon } from "@chakra-ui/icons"

const FeatureView = (props) => {
  const feature = props.item as Feature
  const removeCb = props.deleteCallback
  const updateCb = props.updateCallback
  const switchInitState = feature.value
  const { hasCopied, onCopy } = useClipboard(
    `private readonly string FLAG_${feature.name.toLocaleUpperCase()} = "${feature.uuid}";`
  )

  function deleteFeature(e: any, feature: Feature) {
    removeCb(feature.id)
    console.log({ e, feature })
  }

  function updateFeature(e: any, feature: Feature) {
    // console.log({feature})
    updateCb(feature, e)
  }

  return (
    <Tr className="featureTableRow">
      <Link href={Routes.ShowFeaturePage({ featureId: feature.id })}>
        <Td maxWidth="40vw">{feature.name}</Td>
      </Link>
      <Td>
        <Button onClick={onCopy} colorScheme="teal">
          <CopyIcon />
        </Button>
      </Td>
      <Td width="fit-content">
        <Center>
          <FormControl>
            <Switch
              id="switch_box"
              size="md"
              isChecked={switchInitState}
              onChange={(e) => {
                updateFeature(e, feature)
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
