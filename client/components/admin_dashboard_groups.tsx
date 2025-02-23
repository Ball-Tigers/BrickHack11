'use client'
import { createNewGroup } from "@/app/admin_dashboard/page";
import AdminDashboardGroup from "@/components/dashboard_permission_group";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useState } from "react";

interface Props {
    groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[]
}

export default function AdminGroups({groupData}: Props) {
    const [textField, updateTextField] = useState("")
    return (
        <div className="flex flex-col justify-between align-center">
            <div className="p-15 h-full w-full justify-around space-x-10">
                <input className=" bg-white border-white border-sm rounded text-[42px]"type="text" onChange={(e) => updateTextField(e.target.value)}></input>
                <button className="button-invite"onClick={(async () => { await createNewGroup(textField); updateTextField("")})}>Add Group</button>
            </div>
            
            {
                <Accordion variant="shadow">
                {groupData.map((item) => {
                    return (

                    <AccordionItem key={item.name} aria-label="Accordion 1" title={item.name}>
                        <AdminDashboardGroup title={item.name} devices={item.devices}></AdminDashboardGroup>
                    </AccordionItem>
                    )
                })}
                </Accordion>
            }
        </div>
    )
    
}