'use client'
// import { useState } from "react"

export default function UserDownloadFile() {
    // const [hasAuth, setHasAuth] = useState(true)

    return (
        <div className="flex w-full h-full content-normal">
            
            <div className='"h-screen flex items-center justify-center"'>
                <h1 className="custom-header-strong">Download your file!</h1>
                <div className="flex flex-row justify-content space-x-5 items-align">
                    <input className="text-xl border-2xl text-white bg-lightgray w-min-120" placeholder="Place link code here!"></input>
                    <button className="button-invite shadow-md ">Download</button>
                </div>
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

