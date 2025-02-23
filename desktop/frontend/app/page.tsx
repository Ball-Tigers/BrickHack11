'use client'

import Link from "next/link";

export default function DesktopHome() {
    function handleLink() {
        alert('click')
    }

    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-1/2 bg-accent home-clip-left'>
                <div className='flex justify-center items-center h-full'>
                    <img
                        src="/jafo.png"
                        alt="Jafo Logo"
                        className='300px max-w-[60%]'
                    />
                </div>
            </div>
            <div className='w-1/2 flex flex-col gap-4 justify-center items-center'>
                <Link href='/user_upload_file' className='button'>Upload</Link>
                <Link href='/user_download_file' className='button'>Download</Link>
            </div>
            <button 
                className='absolute bottom-0 right-0 cursor-pointer mx-2 hidden'
                onClick={handleLink}
            >
                Are you an Organization Admin? Click here.
            </button>
        </div>
    )
}