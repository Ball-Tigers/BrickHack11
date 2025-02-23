'use client'

import { useEffect, useState } from "react";

declare global {
    interface Window {
        electronAPI: any;
    }
}

export default function UserUploadFile() {
    const [filePath, setFilePath] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    
    useEffect(() => {
        window.electronAPI.getOrganizations().then(res => {
            setOrganizations(res);
            if(res.length > 0) {
                setSelectedOrg(res[0].orgId);
                if(res[0].groups.length > 0) {
                    setSelectedGroup(res[0].groups[0].name);
                }
            }
        });
    }, [])

    const chooseFile = async () => {
        setFilePath(await window.electronAPI.chooseFile());
    };

    const uploadFile = async() => {
        const fileKey = (await window.electronAPI.uploadFile({
            filePath: filePath,
            selectedOrg: selectedOrg,
            selectedGroup: selectedGroup
        })).fileKey;

        alert(fileKey);
        console.log(fileKey);
    };

    const onSelectOrganization = (event) => {
        setSelectedOrg(event.target.value);
        const groups = (organizations.find((org: any) => org.orgId == event.target.value) as any)?.groups;
        if(groups && groups.length > 0) {
            setSelectedGroup(groups[0].name);
        } else {
            setSelectedGroup(null);
        }
    }

    const onSelectGroup = (event) => {
        setSelectedGroup(event.target.value);
    }

    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-1/2 flex flex-col items-center justify-center gap-8'>
                <div className="flex flex-col justify-center items-center min-w-[20%] w-[200px] max-w-[40%] ">
                    <div onClick={chooseFile} className='p-16 gap-2 flex justify-center items-center aspect-square border-dashed border-4 border-accent rounded-4xl'>
                        <img
                            src='document.png'
                        />
                    </div>
                    <p className='text-text'>Drag and drop a file, or click</p>
                </div>
                <div className="flex flex-col gap-2 w-[300px]">
                    <p className="text-secondary text-2xl">Choose an Organization:</p>
                    <select className="bg-secondary w-full p-4" onChange={onSelectOrganization}>
                        {organizations.map((org: any, index) => {
                            return <option key={index} value={org.orgId}>{org.orgId}</option>
                        })}
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-[300px]">
                    <p className="text-secondary text-2xl">Choose Group to Share to:</p>
                    <select className="bg-secondary w-full p-4" onChange={onSelectGroup}>
                        {selectedOrg &&
                            (organizations.find((org: any) => org.orgId === selectedOrg) as any)?.groups.map((group, index) => <option key={index} value={group.name}>{group.name}</option>)
                        }
                    </select>
                </div>
                <div onClick={uploadFile} className="button">
                    Upload!
                </div>
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex flex-col justify-center items-center'>
                <img 
                    src='jafe_small.png'
                />
                <p className='text-7xl w-1 flex-wrap text-secondary flex justify-center text-center'>Upload</p>
            </div>
        </div>
    );
}