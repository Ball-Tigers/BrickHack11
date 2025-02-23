'use client'
import { useState } from "react"
import { modifyIPList } from "@/app/admin_dashboard/page"

interface Props {
    whiteList: string[]
}

export default function AdminSettings({ whiteList }: Props) {
    const [value, updateValue] = useState("")
  
    return (
        <div className="flex flex-row h-full justify-content align-content py-10 space-x-20 space-y-30">
            
            
            <div className="flex flex-col space-y-5 items-center justify-center">
                <input placeholder="255.255.255.255" type="text" className="bg-white border-white border-sm rounded text-[36px] "onChange={(e) => updateValue(e.target.value)}></input>
                <button className="button-invite" onClick={async () => {console.log(await modifyIPList(whiteList, value));}}>Add IP</button>
            </div>
            
            

            
            <div className="flex flex-col w-full">
            
                <h3 className="custom-header-strong">Whitelisted IPs: </h3>
                <ul>
                    {whiteList.map((item) => {
                        return (
                        <li key={item} className="flex flex-row justify-around">
                            <span className="text-white text-2xl space-x-40 ">{item}</span>
                            <button className="border-lg border-white rounded text-white"name={item} onClick={async (e) => {
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

        </div>
    )
    
}