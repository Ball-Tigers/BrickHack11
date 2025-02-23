'use client';
import AdminDashboardTable from "./admin_dashboard_table";
import { useState } from "react";
import { createInvite } from "@/app/admin_dashboard/page";
import { Accordion, AccordionItem } from "@heroui/accordion";


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
            <button onClick={async (e) => {e.stopPropagation(); await navigator.clipboard.writeText((await createInvite(title)).inviteCode)}}>Invite</button>
            <AdminDashboardTable userData={devices}>

            </AdminDashboardTable>
            
        </>
    )
    
}



