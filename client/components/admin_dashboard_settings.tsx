'use client'
import { ReactElement, ReactHTMLElement } from "react"
import { useState } from "react"
import { modifyIPList } from "@/app/admin_dashboard/page"

interface Props {
    whiteList: string[]
}

export default function AdminSettings({ whiteList }: Props) {
    const [value, updateValue] = useState("")

    return (
        <div>
            <p>Organization Name: </p>
            <input type="text" defaultValue={"Default Name"}></input>

            <input type="text" onChange={(e) => updateValue(e.target.value)}></input>
            <button onClick={async () => {console.log(await modifyIPList(whiteList, value))}}>Add IP</button>

            
            
            <p>Whitelisted IPs: </p>
            <ul>
                {whiteList.map((item) => {
                    return (
                    <li key={item}>
                        <span>{item}</span>
                        <button /*TODO: update whitelisted IPs on backend onclick*/>Remove</button>
                    </li>)
                })}
            </ul>


        </div>
    )
    
}