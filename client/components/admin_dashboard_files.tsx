'use client'

interface SharedFile {
    shareCode: string
    file: string
    timeShared: Date
    expiration: Date
    macLocked: boolean
    from: string
    whoCanAccess: Array<string>
}

export default function AdminFiles() {
    let allFiles = new Array<SharedFile>()

    //temp:
    allFiles.push(
        {shareCode: "0x0x0x0x", file: "BlackCopWhiteSeaman.mov", timeShared: new Date(), expiration: new Date(), macLocked: true, from: "Dante", whoCanAccess: new Array("Jack", "Owen")})
    allFiles.push(
            {shareCode: "391245", file: "Yaoi.txt", timeShared: new Date(), expiration: new Date(), macLocked: true, from: "Dante", whoCanAccess: new Array("Jack", "Owen")})
    
    return (
        <ul>
            {
                allFiles.map((item) => {return (
                    <li key={item.shareCode}><span>{item.file}</span><span>From: {item.from}</span></li>
                )})
            }
        </ul>
    )
    
}