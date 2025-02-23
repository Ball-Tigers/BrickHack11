'use client'
import Link from "next/link";
import AdminInviteHook from '../../components/admin_invite_hook'
import { useSearchParams } from "next/navigation";
import fs from 'fs';

export default function Invite(){
    const searchParam = useSearchParams()
    const inviteCode = searchParam.get("inviteCode")

    const handleClick = () => {
        window.location.href = `jafe://${inviteCode}`
    }

    ``

    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-1/2 flex flex-col justify-center items-center'>
                <p className='custom-header-strong'>Group Invite Code</p>
                <hr/>
                <div>
                    {inviteCode}
                </div>
                <AdminInviteHook />
                <button
                    className='button'
                    onClick={handleClick}
                >
                    Join Group
                </button>
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



