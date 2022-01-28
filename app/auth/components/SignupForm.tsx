import { useMutation, Router } from "blitz"

import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import React, { useState } from "react"
import { Text, Center, Input, IconButton, FormControl, Box, Heading } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import AppConfig from "app/config"
import ErrorDisplayer from "app/core/components/ErrorHandlingComponent"

type SignupFormProps = {
  onSuccess?: () => void
  language:any
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const language = props.language
  console.log({language})

  const onSubmitCb = async (e) => {
    e.preventDefault()
    console.log("signup-submit-Click")
    console.log({ name, email, password })
    console.log(AppConfig)
    try {
      if (AppConfig.signup.enable) {
        Signup.parse({ email, password })
        await signupMutation({ email, password })
      }
    } catch (e) {
      console.log(e.issues)
      // return ()
    }
  }

  return (
    <Box>
      <Heading as="h1" size="4xl" marginBottom={10} textColor="white" textAlign="center">
        {language.text}
      </Heading>
      <form onSubmit={onSubmitCb}>
        <FormControl>
                  <Input
            id="sing_up_email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            display="block"
            placeholder={language.inputEmail.placeholder}
            marginBottom={10}
            textAlign="center"
          />
          <Input
            id="sing_up_password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            display="block"
            placeholder={language.inputPassw.placeholder}
            marginBottom={10}
            textAlign="center"
          />
          <Center>
            <IconButton type="submit" icon={<ArrowForwardIcon />} aria-label="Submit Login" />
          </Center>
        </FormControl>
      </form>
    </Box>
  )
}

export default SignupForm
