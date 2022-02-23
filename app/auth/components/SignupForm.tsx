import { useMutation, Router, Routes } from "blitz"

import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import React, { useState } from "react"
import { Text, Center, Input, IconButton, FormControl, Box, Heading, Link } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

import ErrorDisplayer from "app/core/components/ErrorHandlingComponent"
import { PasswordValidator, SIGNUP_PASSW_VALIDATION } from "app/config"
import ErrorViewComponent from "app/core/components/ErrorViewComponent"

type SignupFormProps = {
  onSuccess?: () => void
  language: any
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorView, setErrorView] = useState("" as any)
  const language = props.language
  // console.log({ language })

  const onSubmitCb = async (e) => {
    e.preventDefault()
    console.log("signup-submit-Click")
    console.log({ name, email, password })
    try {
      Signup.parse({ email, password })

      if (SIGNUP_PASSW_VALIDATION)
        if (!PasswordValidator(password)) {
          throw new Error("Password does not match validation.")
        }

      await signupMutation({ email, password })
      Router.push(Routes.FullScreen())
    } catch (e) {
      setErrorView(true)
      console.log("sign-up error")
    }
  }

  return (
    <Box>
      <Heading as="h1" size="4xl" marginBottom={10} textColor="white" textAlign="center">
        {language.text}
      </Heading>
      {errorView ? (
        <ErrorViewComponent
          title="Błąd rejestracji"
          error={
            "Upewnij się, że hasło ma od 8 do 30 znaków, i zawiera conajmniej 1 małą literę, wielką, i znak"
          }
          statusCode={501}
          closeCb={() => {
            setErrorView(false)
          }}
        />
      ) : (
        <></>
      )}
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
          <Text>
            <Link href={"/login"} className="FormRedirectText">
              Masz już konto? Zaloguj się.
            </Link>
          </Text>
          <Center>
            <IconButton
              className="ButtonFormSubmit"
              type="submit"
              icon={<ArrowForwardIcon />}
              aria-label="Submit Login"
            />
          </Center>
        </FormControl>
      </form>
    </Box>
  )
}

export default SignupForm
