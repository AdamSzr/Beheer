import { useMutation, Router, Routes } from "blitz"

import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import React, { useState } from "react"
import {z} from "zod"
import { Text, Center, Input, IconButton, FormControl, Box, Heading, Link } from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"

import ErrorDisplayer from "app/core/components/ErrorHandlingComponent"
import {  SIGNUP_PASSW_VALIDATION } from "app/config"
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
  const [errors, setErrors] = useState("" as any)
  const language = props.language


  const SignUpValidation = (email: string, password: string) => {
    const passwValidation = z.string()
    .min(8, "Hasło nie może być krótsze niz 8 znaków")
    .max(30, "Hasło nie może być dłuższe niz 30 znaków")
    .regex(/.*[A-Z]/, "Hasło musi zawierać conajmniej 1 dużą literę")
    .regex(/.*[0-9]/, "Hasło musi zawierać conajmniej 1 cyfrę")
    .regex(/.*[a-z]/, "Hasło musi zawierać conajmniej 1 małą literę")
    .regex(/.*[^A-Za-z0-9]/, "Hasło musi zawierać conajmniej 1 znak specjalny")
    const emailValidation = z.string().email("Wprowadzony email wygląda na niepoprawny")

    try{
     passwValidation.parse(password)
     emailValidation.parse(email)
    }
    catch(e){
     setErrors(() => e.errors.map(e => e.message).map(str => <p key={Math.random()}> {str} </p>))
     return false
    }
    return true
  }

  const onSubmitCb = async (e) => {
    e.preventDefault()
    // console.log("signup-submit-Click")
    console.log({ email, password })
    if (!SignUpValidation(email,password)) {
      setErrorView(true)
      return
    }

    await signupMutation({ email, password })
    Router.push(Routes.FullScreen())
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
            errors
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
              setErrorView(false)
              setErrors("")
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
