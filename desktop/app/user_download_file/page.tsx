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
        window.electronAPI.downloadFile("~/Downloads/file.dmp", fileKey).then(success => {
            alert(success);
        });
    };

    const onFileKeyChange = (e) => {
        setFileKey(e.target.value);
    }

    return (
        <div className="flex w-full h-full content-normal">
            <div className='w-1/2 flex flex-col gap-4 items-center justify-center'>
                <h1 className="custom-header-strong">Download File by Key</h1>
                <input onChange={onFileKeyChange} className="text-xl border-2xl bg-primary text-background bg-lightgray p-4 w-[500px] max-w-[70%]" placeholder="Insert file key here"/>
                <button className="button-invite shadow-md ">Download</button>
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex flex-col justify-center items-center'>
                <img 
                    src='jafe_small.png'
                />
                <button onClick={downloadFile} className='text-7xl w-1 flex-wrap text-secondary flex justify-center text-center'>Download</button>
            </div>
        </div>
    )
}

