'use client'
import AdminFiles from "@/components/admin_dashboard_files";
import AdminGroups from "@/components/admin_dashboard_groups";
import AdminSettings from "@/components/admin_dashboard_settings";
import { Http2ServerRequest } from "http2";
import { getCookies } from "next-client-cookies/server";
import Link from "next/link";
import { useState, useEffect } from "react";
import getCookie from "@/lib/cookies";



const orgName: string = "Your Organization Name"

export default function AdminDashboard() {
    
      
    useEffect(() => {
        const postData = async () => {
    
            const url = 'http://localhost:5000/api/organization';

            
            
          
            const options = {
              method: 'POST',
              headers: {
                Authorization: "Bearer " + (await getCookie())
              },
              
            };
          
            try {
              const response = await fetch(url, options);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const responseData = await response.json();
              console.log('Success:', responseData);
            } catch (error) {
              console.error('Error:', error);
            }
        };
        
        postData();
    }, []);

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
            <button onClick={() => setState(1)}>Files</button>
            <button onClick={() => setState(2)}>Settings</button>
            <Link href="/auth/logout"><button>Logout!</button></Link>
            

            {state == 0 && <AdminGroups></AdminGroups>}
            {state == 1 && <AdminFiles></AdminFiles>}
            {state == 2 && <AdminSettings></AdminSettings>}
        </>
    )
}