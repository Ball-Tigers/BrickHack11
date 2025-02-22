'use client'
import AdminGroups from "@/components/admin_dashboard_groups";
import AdminSettings from "@/components/admin_dashboard_settings";
import { useState } from "react";

var orgName: string = "Your Organization Name"

export default function AdminDashboard() {
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

                <h1>{orgName}</h1>
                {/* TODO: get groups and their devices from Jack's ass (backend) */}
                
            </div>

            <button onClick={() => setState(0)}>Groups</button>
            <button onClick={() => setState(1)}>Files (Not yet implemented)</button>
            <button onClick={() => setState(2)}>Settings</button>

            {state == 0 && <AdminGroups></AdminGroups>}
            {state == 1 && <p>BlackCopWhiteSeaman.mov</p>}
            {state == 2 && <AdminSettings></AdminSettings>}
        </>
    )
}