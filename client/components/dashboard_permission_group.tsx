'use client';
import AdminDashboardTable from "./admin_dashboard_table";
import { useState } from "react";
import { createInvite } from "@/app/admin_dashboard/page";


interface Props {
    title: string
    devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>
}

export default function AdminDashboardGroup({title, devices}: Props) {
    const [toggle, setToggle] = useState(false);

    function click() {
        setToggle(!toggle)
    }

    return (  
        <>
            <div onClick={click}>
                <h3>{title}</h3>
                {
                    toggle && <button onClick={async (e) => {e.stopPropagation(); await navigator.clipboard.writeText((await createInvite(title)).inviteCode)}}>Invite</button>
                }
                {
                    toggle && (<div className = "permission-group">
                        <AdminDashboardTable userData={devices}>

                        </AdminDashboardTable>
                    </div>)
                }
            </div>
        </>
    )
    
}



