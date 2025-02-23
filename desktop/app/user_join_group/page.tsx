'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function UserJoinGroup() {
    const searchParams = useSearchParams();

    useEffect(() => {
        alert(searchParams.get("inviteCode"));
    }, []);

    return (
        <div className='fancy-gradient'>  
            <h1>User Join Group</h1>
            <p>Pretty or simple background</p>
            <p>Button to accept, brings to home page</p>
            <Link href='/'>Home Page</Link>
        </div>
    );
}