interface SharedFile {
    shareCode: string
    file: string
    timeShared: Date
    expiration: Date
    macLocked: boolean
    from: string
    whoCanAccess: Array<string>
}

export default function FilesRow({
    shareCode,
    file, 
    timeShared,
    expiration,
    macLocked,
    from,
    whoCanAccess}: SharedFile) {
    

    return (
        <div>
            <span>{file}</span>
            <span>From: {from}</span>
            <span>Access: {whoCanAccess}</span>
        </div>
    )
    
}