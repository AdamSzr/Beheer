import React, { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

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
} from "@chakra-ui/react"
import { makePublicRouterInstance } from "next/dist/client/router"
import { GenerateRandomString } from "app/utils/base"
import AboutPage from "./about"
import MenuWindow from "app/core/components/MenuWindow"
import { AppViews } from "app/lang/available"
import { useSession } from "blitz"

const FullScreen: BlitzPage = (props: any) => {
  const translation = props.lang.get(AppViews.home)

  const homePageText = () => {
    return (
      <div id="home_text">
        <p> Serwis Beheer </p>
        <p id="quote">
          <i>„Czasu nie cofniesz, ale błędy możesz naprawić.” </i>
        </p>
        <div>
          <p>
            Bezpieczeństwo programu to sprawa najwyższej wagi. Firmy budują swoje zaufanie w śród
            klientów przez dziesiątki lat, jeden krytyczny błąd może spowodować katastrofalne
            skutki.
          </p>

          <p>
            Serwis Beheer (słowo pochodzi z języka holenderskiego i oznacza „zarządzanie”) to
            projekt który ma wspomóc programistów bezpiecznie wprowadzać zmiany w kodzie programu
            poprzez mechanizm flag (ang. feature-flag), automatyczne wyłączanie flag gdy wystąpi
            błąd wykonywania kodu, wykresy i statystyki. Współczesne programy są niezwykle
            rozbudowane i nie sposób prześledzić wszystkich ścieżek wykonywanego kodu, co za tym
            idzie, zmiany w jednym obszarze aplikacji mogą spowodować wystąpienie w innym module
            aplikacji. Szybkie reagowanie na takie zachowania mogą uratować firmę. Skutki
            wystąpienia błędów krytycznych niosą za sobą poważne konsekwencje - w najgorszym
            przypadku spowodują zamknięcie firmy, sprawy karne, czy zadość uczynienie.
            <p>
            Istnieją dwa kryteria oceny błędu, pierwszy z nich to – ważność. Określa jak duży wpływ
            na system ma dany defekt i jakie konsekwencje za sobą niesie. Wyróżniamy:
            <ul>
              <li>
                <span>błąd krytyczny</span> – uniemożliwia korzystania podstawowych funkcji systemu
              </li>
              <li>
                <span> błąd pilny</span>- znacząco utrudnia korzystanie z systemu, istnieje
                możliwość obejścia błędu w celu osiągnięcia oczekiwanego wyniku. Jako przykład może
                posłużyć alternatywna metoda płatności w sklepie internetowym
              </li>
              <li>
                <span> błąd normalny </span> – utrudnia korzystanie, nie mniej jednak system ciąż
                jest w pełni funkcjonalny
              </li>
              <li>
                <span>błąd mało istotny</span> – zazwyczaj błędy ortograficzne interpunkcyjne, źle
                dobrany kolor
              </li>
            </ul>
          </p>
            <p>
              Z historii znamy już kilka takich przypadków:
              <ul>
                <li>
                  Między 1985 a 1987 rokiem 6 osób uległo poparzeniu w wyniku naświetlań maszyną
                  Therac-25 Była to maszyna stosowana w latach 80 do radioterapii nowotworów. Trzy z
                  nich zmarły w następstwie wypadku. A oto przypadek jednego z pacjentów. W 1985 r.
                  – jedna z maszyn uległa awarii, wyświetlając komunikat o błędzie i niepodjęciu
                  naświetlania. Operator, przyzwyczajony do humorów urządzenia, wymusił wykonanie
                  procedury. Maszyna pięciokrotnie podejmowała próbę wykonania naświetlenia, po czym
                  zupełnie odmówiła posłuszeństwa. 3 miesiące później pacjent, który brał udział w
                  zabiegu, zmarł w związku z powikłaniami napromieniowania.
                </li>
                <li>
                  15 stycznia 1990 r. ponad 60 tys. klientów AT&T nie mogło zestawić połączeń
                  międzymiastowych. Przyczyną była awaria oprogramowania w przełącznikach 4ESS
                  Miesiąc przed awarią AT&T postanowiło przyspieszyć ten proces i zmieniło nieco
                  parametry. Ponieważ reakcja była zbyt szybka, druga wiadomość trafiała podczas
                  restartu przełącznika, zatem oprogramowanie stwierdzało awarię, wystawiało sygnał
                  przepełnienia i wykonywało restart. Skutkiem błędów była lawina restartów i odmowa
                  obsługi.
                </li>
              </ul>
            </p>
          </p>

        </div>
      </div>
    )
  }

  return (
    <Box minH="100vh" id="FullScreen">
      <Suspense fallback="Please wait. Loading...">
        <MenuWindow lang={props.lang}>
          <Text> {homePageText()}</Text>
        </MenuWindow>
      </Suspense>
    </Box>
  )
}

FullScreen.authenticate = { redirectTo: "/login" }
FullScreen.getLayout = (page) => <Layout title="FeatureService">{page}</Layout>

export default FullScreen
