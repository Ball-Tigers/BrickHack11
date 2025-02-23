'use client'

import '../public/accordion.css'

interface SharedFile {
    shareCode: string
    file: string
    timeShared: Date
    expiration: Date
    macLocked: boolean
    from: string
    whoCanAccess: Array<string>
}

interface Props {
    groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[]
}

export default function AdminFiles({groupData}: Props ) {
    const allFiles = new Array<SharedFile>()

    console.log(groupData)
    //temp:
    allFiles.push(
        {shareCode: "0x0x0x0x", file: "BlackCopWhiteSeaman.mov", timeShared: new Date(), expiration: new Date(), macLocked: true, from: "Dante", whoCanAccess: ["Jack", "Owen"]})
    allFiles.push(
            {shareCode: "391245", file: "Yaoi.txt", timeShared: new Date(), expiration: new Date(), macLocked: true, from: "Dante", whoCanAccess: ["Jack", "Owen"]})
    
    return (
        
    <div className="flex flex-col justify-content align-content h-full space-y-10">

            <div className="accordion" onClick={(e) => {
                    const element = e.target as HTMLElement;
                    return element.classList.contains("active") ? element.classList.remove('active') : element.classList.add('active');
                }}>
                <div className="title">
                    <h2>Groups</h2>
                </div>
                <div className="content">
                {groupData.map(((item) => {
                        if(item){
                            return(
                                <h2 key={item.name}>{item.name}</h2>
                            )
                        }
                    }))}
                </div>
            </div>
        <table className="my-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Document
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        From
                    </th>
                </tr>
            </thead>
            <tbody>
            {allFiles.map((item) => {return (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" key={item.shareCode}>
                    
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.file}</th>
                    <td className="px-6 py-4">{item.timeShared.getDate()}</td>
                    <td className="px-6 py-4">{item.from}</td>
                    
                </tr>
            )})}
            </tbody>
        </table>
    </div>

    )

    
}