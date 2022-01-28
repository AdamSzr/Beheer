import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFeature from "app/core/mutations/createFeature"
import { Suspense, useState } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Feature } from "app/core/models/model"
import { FeatureZod } from "app/core/models/validation"

import BorderComponent from "app/core/components/BorderComponent"
import { Box, Button, Input, Switch } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

const CircleCreateComponent = (props) => {
  const currentUser = useCurrentUser()
  const [createFeatureMutation] = useMutation(createFeature)

  const [fname, setFname] = useState("")
  const [value, setValue] = useState(false)

  return (
    <Link href={props.redirect}>
      <Button colorScheme="teal" position="absolute" right="2vh" top="2vh" style={props.style}>
        <AddIcon />
      </Button>
    </Link>
  )
}
export default CircleCreateComponent
