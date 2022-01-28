import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFeature from "app/core/mutations/createFeature"
import { Suspense, useState } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Feature } from "app/core/models/model"
import { FeatureZod } from "app/core/models/validation"

import BorderComponent from "app/core/components/BorderComponent"
import { Box, Button, Center, IconButton, Input, Switch, Td, Tr } from "@chakra-ui/react"
import CircleCreateComponent from "app/core/components/CircleCreateComponent"
import { AddIcon } from "@chakra-ui/icons"
import { CreateFeature } from "app/auth/validations"

const CreateFeatureRow = (props) => {
  const currentUser = useCurrentUser()
  const createFeatureSuccessCb = props.onCreateSuccess
  const [createFeatureMutation] = useMutation(createFeature)

  const [fname, setFname] = useState("")
  const [value, setValue] = useState(false)

  const create = async (e) => {
    e.preventDefault()
    const feature = new Feature(currentUser?.id as number, fname, value)
    if (!CreateFeature(fname))
      throw new Error("Feature name can not contain any other characters then [a-z][A-Z][0-9][~_-]")

    FeatureZod.parse(feature)
    const newf = await createFeatureMutation(feature)
    console.log({ feature: newf })
    createFeatureSuccessCb(newf)
    clearInputAfterSubmit()
  }

  function clearInputAfterSubmit() {
    let inputElement = document.getElementById("NewFeatureNameInput") as any
    inputElement.value = ""
  }

  return (
    <Tr id="CreateFeatureRow">
      <Td colSpan={2}>
        <Input
          id="NewFeatureNameInput"
          placeholder={props.placeholder}
          type="text"
          size="sm"
          variant="outline"
          onChange={(e) => setFname(e.target.value)}
        />
      </Td>
      <Td>
        <Center>
          <IconButton
            icon={<AddIcon />}
            onClick={async (e) => {
              await create(e)
            }}
            textColor="black"
            colorScheme="green"
            aria-label=""
          />
        </Center>
      </Td>
      {/* <h1>Create New Feature</h1>
      <Suspense fallback="Loading">
        <NewFeatureForm />
      </Suspense> */}
    </Tr>
  )
}

const NewFeaturePage: BlitzPage = (props: any) => {
  const currentUser = useCurrentUser()
  const createFeatureSuccessCb = props.onCreateSuccess
  const [createFeatureMutation] = useMutation(createFeature)

  const [fname, setFname] = useState("")
  const [value, setValue] = useState(false)

  const create = async (e) => {
    e.preventDefault()
    const feature = new Feature(currentUser?.id as number, fname, value)
    console.log({ feature })
    FeatureZod.parse(feature)
    const newf = await createFeatureMutation(feature)
    createFeatureSuccessCb(newf)
    console.log(newf)
  }

  return (
    <Tr>
      <Td>
        <Input type="text" size="sm" variant="outline" onChange={(e) => setFname(e.target.value)} />
      </Td>
      <Td></Td>
      <Td>
        <IconButton
          icon={<AddIcon />}
          onClick={async (e) => {
            await create(e)
          }}
          textColor="black"
          colorScheme="green"
          aria-label=""
        />{" "}
      </Td>
      {/* <h1>Create New Feature</h1>
      <Suspense fallback="Loading">
        <NewFeatureForm />
      </Suspense> */}
    </Tr>
  )
}

NewFeaturePage.authenticate = true
NewFeaturePage.getLayout = (page) => <Layout title={"Create New Feature"}>{page}</Layout>

export default CreateFeatureRow
