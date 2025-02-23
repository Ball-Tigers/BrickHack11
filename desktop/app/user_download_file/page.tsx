'use client'
// import { useState } from "react"

export default function UserDownloadFile() {
    // const [hasAuth, setHasAuth] = useState(true)

    return (
        <div className="flex flex-row w-full h-full">
            <div className='w-1/2 flex justify-center items-center'>
                {
                    true ? (
                        <a className='button'>Link is here</a>
                    ) : (
                        <div>hasNotAuth</div>
                    )
                }
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex flex-col justify-center items-center'>
                <img 
                    src='jafe_small.png'
                />
                <p className='text-7xl w-1 flex-wrap text-secondary flex justify-center text-center'>Download</p>
            </div>
            {/* <h1>User Download File</h1>
            <p>If has access, button to download</p>
            <p>If no access, big cry face emoji</p> */}
        </div>
    )
}