import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useMutation,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
import "app/core/styles/sheet.css"
import { Suspense } from "react"

import { ChakraProvider, Box } from "@chakra-ui/react"
import Join from "app/auth/pages/join"
import { AppDefaultLanguages, AppViews, Lang } from "app/lang/available"
import { useState } from "react"
import lang from "app/auth/mutations/lang"
import { DEFAULT_LANGUAGE } from "app/config"
import ErrorViewComponent from "app/core/components/ErrorViewComponent"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  const [currentLang, setCurrentLang] = useState(DEFAULT_LANGUAGE)
  const [language, setLang] = useState(AppDefaultLanguages[currentLang])
  const langObj = { get: getLanguageFor, update: updateLanguage }
  console.log({ language })

  function updateLanguage() {
    setLang((current) => {
      if (current.lang == Lang.PL) {
        setCurrentLang(Lang.EN)
        return AppDefaultLanguages[Lang.EN]
      } else {
        setCurrentLang(Lang.PL)
        return AppDefaultLanguages[Lang.PL]
      }
    })
  }

  function getLanguageFor(view: AppViews) {
    return language.views[view]
  }

  return (
    <ChakraProvider>
      <Box bgColor="#292b2c" minH="100vh" textColor="#f7f7f7" id="Background">
        <ChakraProvider>
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            {getLayout(
              <Component {...pageProps} lang={langObj} />
            )}
          </ErrorBoundary>
        </ChakraProvider>
      </Box>
    </ChakraProvider>
  )

  function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    if (error instanceof AuthenticationError) {
      return <Join lang={langObj}/>
    } else if (error instanceof AuthorizationError) {
      return (
        // <ErrorViewComponent error={error} statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />
        <ErrorComponent
          error={error}
          statusCode={error.statusCode}
          title="Sorry, you are not authorized to access this"
        />
      )
    } else {
      return (
        // <ErrorViewComponent error={error} statusCode={error.statusCode || 400} title={error.message || error.name} />
        <ErrorComponent
          error={error}
          statusCode={error.statusCode || 400}
          title={error.message || error.name}
        />
      )
    }
  }
}
