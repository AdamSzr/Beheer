import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { AppViews } from "app/lang/available"
import BorderComponent from "app/core/components/BorderComponent"
import { Lang } from "app/pages/types"

type LoginProps = {
  lang: Lang
}

const LoginPage = (props: LoginProps) => {
  console.log({ props })
  const language = props.lang.get(AppViews.login)
  const router = useRouter()

  return (
    <BorderComponent>
      <LoginForm
        language={language}
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </BorderComponent>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Login">{page}</Layout>

export default LoginPage
