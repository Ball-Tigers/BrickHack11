"use server";

import { cookies } from "next/headers";

const getCookie = async () => 
    {
        return (await cookies()).get('__session')?.value
    }

export default getCookie