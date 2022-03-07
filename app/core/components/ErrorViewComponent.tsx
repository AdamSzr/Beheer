import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AppSettings from "../settings"

type ErrorProps = {
  error: any
  statusCode: number
  title: string
  closeCb: () => void
}

const ErrorViewComponent = (props: ErrorProps) => {

  useEffect(() => {
    setTimeout(() => {
      props.closeCb()
    }, AppSettings.errorCloseTimeout)
  })

  return (
    <Alert id="ErrorView" status="error">
      <AlertIcon />
      <AlertTitle mr={2}>
        {props.title} {props.statusCode}
      </AlertTitle>
      <AlertDescription>{props.error}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" onClick={props.closeCb} />
    </Alert>
  )

}

export default ErrorViewComponent
