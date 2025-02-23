'use client'

import React, { useState, useEffect } from "react"

export default function AdminInviteHook(inviteCode:string) {
    const [promise, setPromise] = useState(null)

    useEffect(() => {
        getGroupNameFromCode()
    })

    const getGroupNameFromCode = async () => {
        const url = `localhost:5000/api/organization/group/invite?inviteCode=${inviteCode}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log('Success:', responseData);
            setPromise(responseData)
          } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <p> {promise} </p>
    )
}