'use client';

import { createInvite } from "@/app/admin_dashboard/page";
import AdminDashboardTable from "./admin_dashboard_table";
import { useState } from "react";


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
            
            <AdminDashboardTable userData={devices}/>
        </>
    );
    
}



