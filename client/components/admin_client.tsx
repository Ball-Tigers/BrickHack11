'use client'
import AdminFiles from "@/components/admin_dashboard_files";
import AdminGroups from "@/components/admin_dashboard_groups";
import AdminSettings from "@/components/admin_dashboard_settings";
import Link from "next/link";
import { useState } from "react";
import { auth0 } from "@/lib/auth0";

export default function AdminClient() {
    
    

    const [state, setState] = useState(0);


    return (
        <>
            <div>
                <h1>Admin Dashboard</h1>
                <p>List all IP Addresses</p>
                <p>List all Groups</p>
                <p>List all MAC within Groups</p>
                <p>Add/Remove Groups, IP, MAC</p>
                <p>List of all active files</p>
                <p>Log out button</p>

                <h1>Your Organization Name</h1>
                {/* TODO: get groups and their devices from Jack's ass (backend) */}
                
            </div>

            <button onClick={() => setState(0)}>Groups</button>
            <button onClick={() => setState(1)}>Files</button>
            <button onClick={() => setState(2)}>Settings</button>
            <Link href="/auth/logout?groupName=heyheyhey"><button>Logout!</button></Link>
            
            

            {state == 0 && <AdminGroups></AdminGroups>}
            {state == 1 && <AdminFiles></AdminFiles>}
            {state == 2 && <AdminSettings></AdminSettings>}
        </>
    )
}
