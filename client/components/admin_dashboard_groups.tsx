'use client'
import { createNewGroup } from "@/app/admin_dashboard/page";
import AdminDashboardGroup from "@/components/dashboard_permission_group";
import { useState } from "react";
import { createInvite } from "@/app/admin_dashboard/page";
import "@/public/accordion.css"

interface Props {
    groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[]
}

export default function AdminGroups({groupData}: Props) {
    const [textField, updateTextField] = useState("")
    return (

        <>
        <div className="flex flex-col justify-between align-center">
            <div className="p-15 h-full w-full flex justify-around space-x-10">
                <input placeholder="    group name" className=" bg-[#444444] border-black border-[3px] border-sm rounded-[10px] text-[30px]"type="text" onChange={(e) => updateTextField(e.target.value)}></input>
                <button className="button-invite m-auto p-2%" onClick={(async () => { await createNewGroup(textField); updateTextField("")})}>Add Group</button>
            </div>

            {
                <div>
                {groupData.map((item) => {
                    return (

                    <div key={item.name} className="accordion !rounded-[10px] border-[3px] border-accent border-solid cursor-pointer" onClick={(e) => {
                            let element = e.target as HTMLElement;
                            while (!element.classList.contains("accordion")) {
                                if (element.parentElement != null)
                                element = element.parentElement
                            }
                            return element.classList.contains("active") ? element.classList.remove('active') : element.classList.add('active');
                        }}>
                        <div className="title text-white flex">
                            <h2>{item.name}</h2>
                            <div className="text-white p-[0.7em] bg-primary cursor-pointer rounded-[20px]" onClick={async (e) => {e.stopPropagation(); navigator.clipboard.writeText((await createInvite(item.name)).inviteCode)}}>Invite</div>

                        </div>
                        <div className="content">
                            <AdminDashboardGroup title={item.name} devices={item.devices}></AdminDashboardGroup>
                        </div>
                    </div>
                    )
                })}
                </div>
            }
            </div>
        </>
    )
    
}