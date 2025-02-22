'use client';
import AdminDashboardTable from "./admin_dashboard_table";
import { useState } from "react";


interface Props {
    title: string
    
}

export default function AdminDashboardGroup({title}: Props) {
    const [toggle, setToggle] = useState(false);

    function click() {
        setToggle(!toggle)
    }

    return (  
        <>
            <div onClick={click}>
                <h3>{title}</h3>
                {
                    toggle && <button>Invite</button>
                }
                {
                    toggle && (<div className = "permission-group">
                        <AdminDashboardTable userData={FetchDevices()}>

                        </AdminDashboardTable>
                    </div>)
                }
            </div>
        </>
    )
    
}

function FetchDevices() {
    //TODO: get jack shit
    return Array({id:"Jack", mac: "1812470124"}, {id:"Owen", mac: "1812470124"}, {id:"Dante", mac: "1812470124"})
}

