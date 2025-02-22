'use client'
import { auth0 } from "@/lib/auth0"
import { SessionData } from "@auth0/nextjs-auth0/types"
import { rejects } from "assert"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
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

const login= async () => {
    const session = await auth0.getSession()

    return session ? session : null  
}