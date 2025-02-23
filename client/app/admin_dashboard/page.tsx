'use server'
import AdminClient from "@/components/admin_client";
import { auth0 } from "@/lib/auth0";


export default async function AdminDashboard() {
    


    let groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[] = []
    
    const whiteList = (await postOrganizationData()).whitelistedIPs;

    groupData = await getData()

    return (
        <div className="w-full h-full flex justify-start">
            <AdminClient groupData={groupData} whiteList={whiteList}></AdminClient>
        </div>
    );
    
}

export async function postOrganizationData() {
    const session = await auth0.getSession()
    const url = 'http://localhost:5000/api/organization';
  
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.tokenSet.accessToken
      },
      
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      //console.log('Success:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
}

export async function getData() {
    const session = await auth0.getSession()
    const url = 'http://localhost:5000/api/organization/';
    let groups: Array<{name: string}>;
    const groupData: {name: string, devices: Array<{_id: string, orgId: string, groupName: string, name: string, macAddress: string}>}[] = []
  
    const options = {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + session?.tokenSet.accessToken
      },
      
    };
  
    try {
      const response = await fetch(url + "group", options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      //console.log('Success:', responseData);
      groups = responseData;
    } catch (error) {
      console.error('Error:', error);
      return []
    }

    

    for (let group of groups) {
        try {
            const response = await fetch(url + "device?groupName=" + group.name, options);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            //console.log('Success:', responseData);
            groupData.push({name: group.name, devices: responseData});
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return groupData;
}

export async function createNewGroup(name:string) {
    const session = await auth0.getSession()
    const url = 'http://localhost:5000/api/organization/group';
    const data = {
        name: name
    }

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.tokenSet.accessToken
      },
      body: JSON.stringify(data)
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const responseData = await response.json();
        console.log('Error:', responseData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
}

export async function modifyIPList(whiteList: string[], IP: string, remove: boolean = false) {
    
  const split = IP.split('.');
  const casted = split.map((item) => parseInt(item))
  let valid = casted.length == 4 && whiteList.find((item) => item == IP);
  for (let number of casted) {
      if (number < 0 || number > 255) {
          valid = false;
      }
  }
  if (!valid) {
    return whiteList
  }
  
  const session = await auth0.getSession()
    const url = 'http://localhost:5000/api/organization';
    if (!remove) {
        whiteList.push(IP)
    }
    else {
        whiteList = whiteList.filter((item) => item != IP)
    }
    const data = {
        whitelistedIPs: whiteList
    }

    const options = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.tokenSet.accessToken
      },
      body: JSON.stringify(data)
    };

    console.log(options.body)
  
    try {
      const response = await fetch(url, options);
      console.log(response)
      if (!response.ok) {
        const responseData = await response.json();
        console.log('Error:', responseData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log('Success:', responseData);
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
}

export async function createInvite(group: string) {
    const session = await auth0.getSession()
    const url = 'http://localhost:5000/api/organization/group/invite';
    const data = {
        groupName: group
    }

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.tokenSet.accessToken
      },
      body: JSON.stringify(data)
    };
    
    console.log(options.body)

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const responseData = await response.json();
        //console.log('Error:', responseData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData)
      return responseData;
    } catch (error) {
      console.error('Error:', error);
    }
}