'use server'
import AdminClient from "@/components/admin_client";
import { auth0 } from "@/lib/auth0";

export default async function AdminDashboard() {
    
    const session = await auth0.getSession()

    const postData = async () => {
    
        const url = 'http://localhost:5000/api/organization';
      
        const options = {
          method: 'POST',
          headers: {
            Authorization: "Bearer " + session?.tokenSet.accessToken
          },
          
        };
      
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseData = await response.json();
          console.log('Success:', responseData);
        } catch (error) {
          console.error('Error:', error);
        }
    };
    
    postData();

    

    return (
        <>
            <AdminClient></AdminClient>
        </>
    )
}