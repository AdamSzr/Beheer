import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"

const ErrorDisplayer = (props) => {
  const error = props.error

  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Your browser is outdated!</AlertTitle>
      <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px"  />
    </Alert>
  )
}
export default ErrorDisplayer
