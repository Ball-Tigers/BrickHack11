
import { auth0 } from "@/lib/auth0"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth0.getSession()
  
  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup"><button>Sign up</button></a>
        <br></br>
        <a href="/auth/login"><button>Log in</button></a>
        <Link href="/admin_invite">view invite</Link>
      </main>
    )
  } else {
    redirect("./admin_dashboard")
  }
 
}   

interface inviteProps{
  groupCode : string;
}

