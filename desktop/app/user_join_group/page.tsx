'use client'

import { useSearchParams } from "next/navigation";
import React, { useState } from 'react';

declare global {
    interface Window {
        electronAPI: any;
    }
}

export default function UserJoinGroup() {
    const [input, setInput] = useState('')
    const searchParams = useSearchParams()

    const handleButtonClick = () => {
        const data = {
            name: input,
            inviteCode: searchParams.get('inviteCode')
        }

        alert(searchParams.get('inviteCode'))

        window.electronAPI.acceptGroup(data).then(res => {
            alert(JSON.stringify(res))
            if (res.error) {
                console.log(res.error)
            }
            else {
                console.log(res)
            }
        })
    }

    return (
        <div className="flex flex-col gap-8">
            <div className='flex flex-col gap-2'>
                <h1 className='custom-header-strong'>User Join Group</h1>
                <hr className="custom-header-strong"/>
            </div>
            <input 
                placeholder='Enter your name here...'  
                className='text-background bg-primary px-[2rem] py-[1rem] rounded'
                onChange={(e) => {
                    setInput(e.target.value)
                }}
            />
            <button className='button' onClick={handleButtonClick}>Join Group</button>
        </div>
    );
}