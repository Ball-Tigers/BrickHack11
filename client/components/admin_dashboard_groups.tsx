'use client'
import AdminDashboardGroup from "@/components/dashboard_permission_group";
import AdminPermissionGroup from "@/components/dashboard_permission_group";

interface Props {
    groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[]
}

export default function AdminGroups({groupData}: Props) {
    
    return (
        <div>
            {
                
                groupData.map((item) => {
                    return (
                        <AdminDashboardGroup title={item.name} devices={item.devices} key={item.name}></AdminDashboardGroup>
                    )
                })
            }
        </div>
    )
    
}