import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createFeature from "app/core/mutations/createFeature"
import { Suspense, useState } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Feature } from "app/core/models/model"
import { FeatureZod } from "app/core/models/validation"

import BorderComponent from "app/core/components/BorderComponent"
import {
  Box,
  Button,
  Center,
  IconButton,
  Input,
  Switch,
  Td,
  Tr,
  Text,
  Heading,
} from "@chakra-ui/react"
import CircleCreateComponent from "app/core/components/CircleCreateComponent"
import { AddIcon } from "@chakra-ui/icons"
import { CreateFeature } from "app/auth/validations"
import { Router } from "next/dist/client/router"
import MenuWindow from "app/core/components/MenuWindow"
import { VALIDATE_FEATURE_NAME } from "app/config"

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
      <Td colSpan={3}>
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
  const router = useRouter()

  const [fname, setFname] = useState("")
  const [value, setValue] = useState(false)

  const create = async (e) => {
    e.preventDefault()

    const feature = new Feature(currentUser?.id as number, fname, value)
    if (!CreateFeature(fname))
      throw new Error("Feature name can not contain any other characters then [a-z][A-Z][0-9][~_-]")

    if (VALIDATE_FEATURE_NAME) FeatureZod.parse(feature)

    const newf = await createFeatureMutation(feature)
    console.log({ feature: newf })
    router.push(`/features`)
    
  }

  return (
    <>
      <Suspense fallback={<div>Wait. Loading...</div>}>
        <MenuWindow lang={props.lang}>
          <Center>
            <BorderComponent>
              <Heading as="h2" marginBottom={10} textColor="white" textAlign="center">
                Nowa funkcjonalność
              </Heading>
              <Input
                marginBottom={"15px"}
                type="text"
                size="sm"
                variant="outline"
                placeholder="Nazwa"
                onChange={(e) => setFname(e.target.value)}
              />
              <IconButton
                icon={<AddIcon />}
                onClick={async (e) => {
                  await create(e)
                }}
                textColor="black"
                colorScheme="green"
                aria-label=""
              />
            </BorderComponent>
          </Center>
        </MenuWindow>
      </Suspense>
    </>
  )
  // <Tr>
  //   <Td>
  //     <Input type="text" size="sm" variant="outline" onChange={(e) => setFname(e.target.value)} />
  //   </Td>
  //   <Td></Td>
  //   <Td>
  //     <IconButton
  //       icon={<AddIcon />}
  //       onClick={async (e) => {
  //         await create(e)
  //       }}
  //       textColor="black"
  //       colorScheme="green"
  //       aria-label=""
  //     />{" "}
  //   </Td>
  //   {/* <h1>Create New Feature</h1>
  //   <Suspense fallback="Loading">
  //     <NewFeatureForm />
  //   </Suspense> */}
  // </Tr>
}

NewFeaturePage.authenticate = { redirectTo: "/login" }
NewFeaturePage.getLayout = (page) => <Layout title={"Create New Feature"}>{page}</Layout>

export default NewFeaturePage
