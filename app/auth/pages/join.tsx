import { useRouter, BlitzPage, AuthenticationError, AuthorizationError } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import LoginPage from "app/auth/pages/login"
import SignupPage from "app/auth/pages/signup"

import { Box, Center, GridItem, HStack, Spacer, Text } from "@chakra-ui/layout"
import { Badge, Switch, IconButton, Icon, Td, Button } from "@chakra-ui/react"
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons"
import { Input, Table, TableCaption, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react"
import { AppViews } from "app/lang/available"


const Join: BlitzPage = (props:any) => {
    console.log({props})
    const router = useRouter()
    const language = props.lang.get(AppViews.join)
    const pages = { "login": <LoginPage lang={props.lang}/>, "sign": <SignupPage lang={props.lang} /> }
    const [currentPage, setCurrentPage] = useState("login")

    function JoinPages() {
        return pages[currentPage]
    }

    return (
        <Box>
            <Center minH="100vh" textAlign="center">
                <Box padding={20} border="2px solid #85C1E9" borderRadius={10} textColor="black">
                    <Box>
                        <HStack id="JoinButtonPanel">
                            <Button colorScheme='blue' onClick={() => { setCurrentPage("login"); }} >
                                {language.login}
                            </Button>
                            <Spacer />
                            <Button colorScheme='blue' onClick={() => { setCurrentPage("sign"); }} >
                                {language.register}
                            </Button>
                        </HStack>
                    </Box>
                    <JoinPages />
                </Box>
            </Center>

        </Box>
    )
}

Join.redirectAuthenticatedTo = "/"
Join.getLayout = (page) => <Layout title="Join">{page}</Layout>

export default Join
