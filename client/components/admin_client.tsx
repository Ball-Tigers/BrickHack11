'use client'
import AdminGroups from "@/components/admin_dashboard_groups";
import AdminSettings from "@/components/admin_dashboard_settings";
import Link from "next/link";
import { useState } from "react";

interface Props {
    groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[],
    whiteList: string[]
}

export default function AdminClient({groupData, whiteList}: Props) {
    
    const [state, setState] = useState(0);
 
 
    return (
        <div className="flex flex-col w-full h-full items-center py-20 g-4 overflow-y-scroll overflow-x-hidden">
            <div className="flex w-min-[800px] flex-row justify-start g-3 space-x-20">
                <button className="button" onClick={() => setState(0)}>Groups</button>
                <button className="button" onClick={() => setState(1)}>Settings</button>
                <Link href="/auth/logout"><button className="button">Logout!</button></Link>
            </div>
            
            {state == 0 && <AdminGroups groupData={groupData} ></AdminGroups>}
            {state == 1 && <AdminSettings whiteList={whiteList}></AdminSettings>}



        </div>
    )
}


