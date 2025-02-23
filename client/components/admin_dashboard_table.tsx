import AdminGroupActions from "./permission_group_actions"

interface Props {
    userData: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>
}


export default function AdminDashboardTable({userData}: Props) {
    

    return (
        <>
            <ul>
                {
                    userData.map((item) => {
                        return <li className="user" key={item.name}>
                            <span>{item.name}</span>
                            <span>{item.macAddress}</span>
                            <div>
                                <button>remove</button>
                                <button>erm (jaysen reference)</button>
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
    
}

