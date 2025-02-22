'as client'
import { auth0 } from "@/lib/auth0"
import Link from "next/link"

export default async function Home() {
  const session = await auth0.getSession()

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup"><button>Sign up</button></a>
        <br></br>
        <a href="/auth/login"><button>Log in</button></a>
      </main>
    )
  }

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <Link href="/auth/logout">Logout!</Link>
    </main>
  )
}







