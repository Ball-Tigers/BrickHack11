
interface Props {
    userData: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>
}


export default function AdminDashboardTable({userData}: Props) {
    

    return (
        <>
            <ul className="flex flex-col justify-between w-full text-white">
                <li className="flex justify-between w-[98%] m-auto p-[1%] bg-[#444444]">
                            <span>Name</span>
                            <span>MAC Address</span>
                            <span>Actions</span>
                        </li>
                {
                    userData.map((item) => {
                        return <li className="flex justify-between w-[96%] m-auto" key={item.name}>
                            <span>{item.name}</span>
                            <span>{item.macAddress}</span>
                            <div>
                                <button className="text-[#ff0000] underline cursor-pointer">Remove</button>
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
    
}

