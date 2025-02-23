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
            <div id="accordion-collapse" data-accordion="collapse" onClick={click}>
                <h2><div className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                    <span>{title}</span>
                    <div className="flex justify-right items-center space-x-5">
                        {
                            toggle && <>
                                <button className="">Invite</button>
                                <img data-accordion-icon className="w-3 h-3" src="down-arrow.png"/>
                            </>
                        }
                        {
                            !toggle && <img data-accordion-icon className="w-3 h-3" src="right-arrow.png"/>
                        }
                    </div>
                    </div>
                </h2>
               
                {
                      <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                      {toggle && (<div className = "permission-group">
                        <AdminDashboardTable userData={devices}>

                        </AdminDashboardTable>
                            </div>)}
                      </div>
                    </div>
                    
                }
            </div>
        </>
    )
    
}



