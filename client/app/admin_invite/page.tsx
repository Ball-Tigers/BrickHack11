'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function Invite(){
    const searchParam = useSearchParams()
    const groupID = searchParam.get("groupName")
    return (
        

        <div className="flex flex-col justify-center items-center min-h-screen ">
            <div className="rounded bg-background py-30 px-20 custom-drop-shadow fixed absolute min-h-60  ">
            <h1 className="text-[48px] text-xl text-center text-balance max-w-[600] text-white "> LOGO </h1>
                    <hr></hr>
                    <br></br>
                    <br></br>
                <div className="flex flex-col align-content-center justify-center bg-lightgray text-wrap max-w-110">
                    
                    <h1 className="custom-header-strong text-balance text-wrap max-w-[600] break-words text-center">{groupID}</h1>
                </div>
                <br></br>
                <br></br>
        
                <div className="flex flex-col justify-center items-center p-10">
                    <button className="button-invite p-10">Open JAFE</button>
                </div>
                <h1 className="text-24 absolute bottom-0 right-0 m-4"><Link className="text-white text-md" href="/">Are you an admin?</Link></h1>
            </div>
        </div>
    )
}



