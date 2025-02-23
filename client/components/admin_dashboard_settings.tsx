'use client'
import { useState } from "react"
import { modifyIPList } from "@/app/admin_dashboard/page"

interface Props {
    whiteList: string[]
}

export default function AdminSettings({ whiteList }: Props) {
    const [value, updateValue] = useState("")
  
    return (
        <div className="flex flex-col h-full items-center py-10 space-x-20 space-y-10">
            
            
            <input placeholder="255.255.255.255" type="text" className="p-[2%] bg-white border-white border-sm m-auto mb-[5px] rounded text-[26px] "onChange={(e) => updateValue(e.target.value)}></input>
            <button className="mt-[5px] mr-auto ml-auto rounded-[5px] bg-primary w-[20%] cursor-pointer" onClick={async () => {console.log(await modifyIPList(whiteList, value));}}>Add IP</button>
            

            
            
            <p className="text-primary m-[7px]">Whitelisted IPs: </p>
            <ul className="bg-[#222222] border-[3px] border-black text-white p-[2%] rounded-[10px] w-full">
                {whiteList.map((item) => {
                    return (
                    <li key={item} className="border-md border-black ml-[2%] mr-[2%] flex justify-between">
                        <span>{item}</span>
                        <button name={item} className="text-[#ff0000] underline cursor-pointer" onClick={async (e) => {
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