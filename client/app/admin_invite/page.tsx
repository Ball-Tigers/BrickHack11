'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Invite(){
    const searchParam = useSearchParams()
    const inviteCode = searchParam.get("inviteCode")

    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                <p>Group Invite Code</p>
                <div>
                    {inviteCode}
                </div>
                <Link
                    href="/"
                    className='button'
                >
                    Open My Fat Ass
                </Link>
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex flex-col justify-center items-center'>
                <div className='flex justify-end w-[300px] max-w-[50%]'>
                    <img 
                        src='jafe_small.png'
                        alt='Jafe Logo'
                    />
                </div>
            </div>
        </div>
    )
}

