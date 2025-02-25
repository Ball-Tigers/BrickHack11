'use server'
import { auth0 } from "@/lib/auth0"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
    const session = await auth0.getSession();

    if (session) {
        redirect("./admin_dashboard")
    }

    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-1/2 bg-accent home-clip-left'>
                <div className='flex justify-center items-center h-full'>
                    <img
                        src="/jafe.png"
                        alt="Jafe Logo"
                        className='300px max-w-[60%]'
                    />
                </div>
            </div>
            <div className='w-1/2 flex flex-col gap-8 justify-evenly items-center'>
                <div className='flex flex-col gap-2'>
                    <h1 className='custom-header-strong text-center'>Organization</h1>
                    <div className='flex flex-row gap-4'>
                        <Link
                            href='/auth/login?screen_hint=signup'
                            className='button flex justify-center items-center'
                        >
                            Sign Up
                        </Link>
                        <Link
                            href='/auth/login'
                            className='button flex justify-center items-center'
                        >
                            Log In
                        </Link>
                    </div>
                    <h1 className='custom-header-strong text-center mt-10'>Get the File Client</h1>
                    <div className="flex flex-row">
                        <a 
                            target='_blank'
                            href='jafe.exe'
                            className='button flex justify-center items-center w-full'
                        >
                            Download Client
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}   



