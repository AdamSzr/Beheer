import { Suspense, useState } from "react"
import {
  Head,
  Link,
  usePaginatedQuery,
  useRouter,
  useMutation,
  useQuery,
  BlitzPage,
  Routes,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import getFeatures from "app/features/queries/getFeatures"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { RandomInt } from "app/utils/base"
import { Feature } from "../../features/models/model"
import deleteFeature from "app/features/mutations/deleteFeature"
import FeatureView from "./../../features/components/featureView"
import { Grid, Box } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { Router } from "blitz"
import createFeature from "app/features/mutations/createFeature"
import updateFeature from "app/features/mutations/updateFeature"
import { Input, Table, TableCaption, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import NewFeaturePage from "./new"
import CreateFeatureRow from "./new"
import MenuWindow from "app/core/components/MenuWindow"
import { sortFeaturesByDateFromLatestToOldest } from "app/utils/features/utils"
import { AppViews } from "app/lang/available"

const FeatureList = (props) => {
  const language = props.lang
  const translation = language.get(AppViews.features)
  // console.log({translation})
  const currentUser = useCurrentUser()
  const featuresBase = useQuery(getFeatures, { userId: currentUser?.id })[0]

  const [features, setFeatures] = useState(sortFeaturesByDateFromLatestToOldest(featuresBase))
  const [deleteFeatureMutation] = useMutation(deleteFeature) as any
  const [updateFeatureMutation] = useMutation(updateFeature) as any
  const [allFeatures, setAllFeatures] = useState(features)
  const [search, setSearch] = useState(false)

  const updateFeatureFunction = async (feature: Feature, e: any) => {
    // console.log("Updating feature list")
    // console.log({feature})
    // console.log({target:features[2]})
    const list = features
    let elementIdx = null as any
    let updatedFeature = null as any

    const indexFound = list.findIndex((item, index) => {
      const prediction = item.id == feature.id
      if (prediction) {
        elementIdx = index
        updatedFeature = Object.assign({}, item) as Feature
      }
      return prediction
    })

    if (!updatedFeature) throw Error("Feature to update not found")
    changeFeatureValue(updatedFeature)

    try {
      const where = { id: updatedFeature.id }
      const data = { value: updatedFeature.value }

      const savedFeature = await updateFeatureMutation({ where, data }, null as any)
      // console.log({ updatedFeature, f })

      list[elementIdx] = savedFeature
      setFeatures(list)
      // console.log({ list })
    } catch (error) {
      console.error("Feature can not be updated")
    }
  }

  const changeFeatureValue = (feature: Feature) => {
    feature.value = !feature.value
  }

  const removeFeature = (featureId) => {
    if (typeof deleteFeatureMutation !== "function")
      throw new Error("Can't delete feature, delete function not found")

    let removed = deleteFeatureMutation(featureId)
    setFeatures((current) => current.filter((item) => item.id != featureId))
    console.log(features)
  }

  const onSearchChange = (e) => {
    // console.log(123)
    if (allFeatures.length == 0 && allFeatures.length != features.length) {
      setAllFeatures(features)
    }

    if (e.target.value == "") {
      setFeatures(allFeatures)

      if (search) setSearch(false)
    } else {
      if (!search) setSearch(true)

      setFeatures((current) =>
        allFeatures.filter((f) => f.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
      )
    }
  }

  function updateAfterSuccessfulCreate(feature: Feature) {
    setFeatures((current) => [feature, ...current])
  }

  return (
    <>
      <Input onChange={onSearchChange} placeholder={translation.inputSearch.placeholder} id="SearchInput" />
      <Table variant="simple" size="sm" id="featureTable">
        <Tbody>
          <CreateFeatureRow onCreateSuccess={updateAfterSuccessfulCreate} placeholder={translation.inputCreate.placeholder} />
          {features.map((f) => {
            return (
              <FeatureView
                key={Date.now() + Math.random() * 1000000}
                item={f}
                updateCallback={updateFeatureFunction}
                deleteCallback={removeFeature}
              />
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}
const FeaturesPage: BlitzPage = (props) => {
  const lang = (props as any).lang

  return (
    <>
      <Suspense fallback={<div>Wait. Loading...</div>}>
        <MenuWindow lang={lang}>
          <FeatureList lang={lang} />
        </MenuWindow>
      </Suspense>
    </>
  )
}


export default FeaturesPage
