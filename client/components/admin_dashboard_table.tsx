import AdminGroupActions from "./permission_group_actions"

interface Props {
    userData: Array<{id: string, mac: string}>
}


export default function AdminDashboardTable({userData}: Props) {
    

    return (
        <>
            <ul>
                {
                    userData.map((item) => {
                        return <li className="user" key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.mac}</span>
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

