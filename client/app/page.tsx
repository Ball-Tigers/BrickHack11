import { auth0 } from "@/lib/auth0"
import Link from "next/link"
import { redirect } from "next/navigation"
import "../public/index.css"

export default async function Home() {
  const session = await auth0.getSession()
  
  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <main>
          <a href="/auth/login?screen_hint=signup"><button >Sign up</button></a>
          <br></br>
          <a href="/auth/login"><button>Log in</button></a>
          <Link href="/admin_invite?groupName=fbewuibfuiewbufi">view invite</Link>
        </main>
      </div>
    )
  } else {
    redirect("./admin_dashboard")
  }
 
}   



