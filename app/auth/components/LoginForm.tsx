import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType, Router } from "blitz"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useState } from "react"
import { Center } from "@chakra-ui/layout"
import { Input, FormControl, Box, Button, IconButton, Text, Heading } from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { User } from "@prisma/client"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  language:any
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const onLoginSuccess = props.onSuccess as any
  const language = props.language
  // console.log({language})


  const onSubmitCb = async (e) => {
    e.preventDefault()
    try {
      Login.parse({ email, password })
      const user = await loginMutation({ email, password }) as User;
      onLoginSuccess(user)
    } catch (e) {
      console.log(e.issues)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswChange = (event) => {
    setPassword(event.target.value)
  }

  return (

    <Box>
      <Heading as="h1" size="4xl" marginBottom={10} textColor="white" textAlign="center">
        {language.text}
      </Heading>
      <form onSubmit={onSubmitCb}>
        <FormControl id="loginForm">
          <Input
            id="login_credentials_login"
            placeholder="Login"
            type="text"
            display="block"
            marginBottom={10}
            onChange={handleEmailChange}
          ></Input>
          <Input
            id="login_credentials_password"
            placeholder="Password"
            type="password"
            display="block"
            marginBottom={10}
            onChange={handlePasswChange}
          ></Input>
          <Center>
            <IconButton icon={<ArrowForwardIcon />} type="submit" aria-label="Submit Login">
              Login
            </IconButton>
          </Center>
        </FormControl>
      </form>
    </Box>
  )
}

export default LoginForm
