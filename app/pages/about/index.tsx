import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import BorderComponent from "app/core/components/BorderComponent"
import {
  Button,
  Center,
  Grid,
  Image,
  Flex,
  GridItem,
  Box,
  Heading,
  Spacer,
  Text,
  IconButton,
  OrderedList,
  ListItem,
  UnorderedList,
  Code
} from "@chakra-ui/react"
import MenuWindow from "app/core/components/MenuWindow"
import { AppViews } from "app/lang/available"


export const AboutThisPage = (props ) => {
  return (
    <Box textAlign={"left"} maxW="95vw">
      <Box>
        <Center fontSize="xl">Praca Inżynierska</Center>
        <OrderedList>
          <ListItem> Tytuł pracy:  </ListItem>
          <Text> Bezpieczne wprowadzanie zmien w kodzie programu.  </Text>
          <ListItem> Cel pracy:  </ListItem>
          <Text> Stworzenie narzędzia ułatwiajace programistom wprowadzanie zmian w kodzie źródłowym programu, oraz kontrolowanie i zarządzanie zmianami bez ingerencji w kod.  </Text>
          <ListItem> Dane wejściowe do badań (obliczeń)  </ListItem>
          <Text> Dane wejściowe pozyskiwane od użytkownika: </Text>
          <UnorderedList>
            <ListItem> login  </ListItem>
            <ListItem> hasło  </ListItem>
            <ListItem> nazwa wprowadzonej zmiany  </ListItem>
          </UnorderedList>
          <Text> Dane gromadzone na potrzeby działania aplikacji  </Text>
          <UnorderedList>
            <ListItem> statystyki wymagane do tworzenia wykresów </ListItem>
          </UnorderedList>
          <ListItem>Zagadnienia podlegające rozpracowaniu:  </ListItem>
          <UnorderedList>
            <ListItem> projektowanie i implementacja witryny internetowej  </ListItem>
            <ListItem> implementcja serwera udostępniającego witrynę internetową oraz api do komunikacji i gromadzenia statystyk  </ListItem>
            <ListItem> baza danych przechowująca dane zgromadzone na potrzeby poprawnego działania aplikacji </ListItem>
            <ListItem> bibiolteka zawierająca klasę  <Code >{"Feature"}</Code> która jest wymagana aby programista mógł wdrażać nowe funkcjionalności </ListItem>
          </UnorderedList>
          <ListItem> W rezultacie wykonania pracy należy przedstawić:  </ListItem>
          <Text> Witrynę internetową posiadającą ekran rejestracji, logowania, widok statystyk, widok tworzenia nowej flagi, oraz widok ustawień flagi </Text>
          <Text> Serwer hostujący witrynę internetową oraz udostępniający api wymagane do poprawnego funkcjonowania biblioteki </Text>
          <Text> Bibiotekę zawierającą klasę Feature za pomocą której będziemy wprowadzali nowe funkcjonalności. </Text>
          <ListItem> Konsultant: -----  </ListItem>
        </OrderedList>
      </Box>
    </Box>
  )
}

const AboutPage: BlitzPage = (props: any) => {

  const language = props.lang.get(AppViews.about)
  console.log()
  return (
    <MenuWindow lang={props.lang}>
      <AboutThisPage />
    </MenuWindow>
  )

}

AboutPage.authenticate = true
AboutPage.getLayout = (page) => <Layout>{page}</Layout>


export default AboutPage
