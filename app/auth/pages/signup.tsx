import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { AppViews } from "app/lang/available"

const SignupPage: BlitzPage = (props:any) => {
  const language = props.lang.get(AppViews.signUp)
  const router = useRouter()

  return (
    <div>
      <SignupForm language={language} onSuccess={() => router.push(Routes.FullScreen())} />
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="SignUp">{page}</Layout>

export default SignupPage
