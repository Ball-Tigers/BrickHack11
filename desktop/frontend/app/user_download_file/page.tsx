'use client'
import { useState } from "react"

export default function UserDownloadFile() {
    const [hasAuth, setHasAuth] = useState(true)

    return (
        <div className="flex flex-row w-full h-full">
            <div className='w-1/2 flex justify-center items-center'>
                {
                    hasAuth ? (
                        <a className='button'>Link is here</a>
                    ) : (
                        <div>hasNotAuth</div>
                    )
                }
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex justify-center items-center'>
                <p className='text-7xl w-1 flex-wrap text-secondary flex justify-center text-center'>Download File</p>
            </div>
            {/* <h1>User Download File</h1>
            <p>If has access, button to download</p>
            <p>If no access, big cry face emoji</p> */}
        </div>
    )
}