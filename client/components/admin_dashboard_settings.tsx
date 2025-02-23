'use client'
import { useState } from "react"
import { modifyIPList } from "@/app/admin_dashboard/page"

interface Props {
    whiteList: string[]
}

export default function AdminSettings({ whiteList }: Props) {
    const [value, updateValue] = useState("")
  
    return (
        <div className="flex flex-col justify-content align-content py-10">
            
            <button onClick={async () => {console.log(await modifyIPList(whiteList, value));}}>Add IP</button>
            <input placeholder="255.255.255.255" type="text" className="bg-white border-white border-sm rounded text-[36px] "onChange={(e) => updateValue(e.target.value)}></input>
            

            
            
            <p>Whitelisted IPs: </p>
            <ul>
                {whiteList.map((item) => {
                    return (
                    <li key={item} className="border-md border-black">
                        <span>{item}</span>
                        <button name={item} onClick={async (e) => {
                            const name = (e.target as HTMLElement).getAttribute("name")
                            
                            if (name) {
                                await modifyIPList(whiteList, name, true)
                            }
                            }
                        }>Remove</button>
                    </li>)
                })}
            </ul>

        </div>
    )
    
}