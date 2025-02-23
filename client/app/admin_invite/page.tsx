'use client'
import { useSearchParams } from "next/navigation";



export default function Invite(){
    const searchParam = useSearchParams()
    const groupID = searchParam.get("groupName")
    return (
        

        <div className="flex justify-center align-center bg-black" >
            <h1>{groupID}</h1>
            <h1> WELCOME TO THE THUNDERDOMEEEEEE </h1>
        </div>
    )
}

