'use client'
import { ReactElement, ReactHTMLElement } from "react"
import { useState } from "react"


export default function AdminSettings() {
    const [IPs, updateIPs] = useState(new Array<string>()) //TODO: get stored list
    const [value, updateValue] = useState("")


    return (
        <div>
            <p>Organization Name: </p>
            <input type="text" defaultValue={"Default Name"}></input>

            <input type="text" onChange={(e) => updateValue(e.target.value)}></input>
            <button onClick={() => {IPs.push(value); updateValue(""); console.log(IPs.toString())}}>Add IP</button>

            
            
            <p>Whitelisted IPs: </p>
            <ul>
                {IPs.map((item) => {
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