'use client'

import { useState } from "react";

declare global {
    interface Window {
        electronAPI: any;
    }
}

export default function UserDownloadFile() {
    const [fileKey, setFileKey] = useState(null);

    const downloadFile = () => {
        window.electronAPI.downloadFile({ fileKey: fileKey }).then(success => {
            console.log(success);
        });
    };

    const onFileKeyChange = (e) => {
        setFileKey(e.target.value);
    }

    return (
        <div className="flex w-full h-full content-normal">
            <div className='w-1/2 flex flex-col gap-4 items-center justify-center'>
                <h1 className="custom-header-strong">Download File by Key</h1>
                <input onChange={onFileKeyChange} className="bg-primary text-xl border-2xl text-background bg-lightgray w-[500px] max-w-[70%] p-4" placeholder="Paste file key here"/>
                <button onClick={downloadFile} className="button-invite shadow-md ">Download</button>
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex flex-col justify-center items-center'>
                <img 
                    src='jafe_small.png'
                />
                <p className='text-7xl w-1 flex-wrap text-secondary flex justify-center text-center'>Download</p>
            </div>
        </div>
    )
}

