export default function AdminSettings() {
    let IPs: string[] = []

    return (
        <>
            <p>Organization Name: </p>
            <input type="text" defaultValue={"Default Name"}></input>

            <p>Whitelisted IPs: </p>
            <button onClick={() => IPs.push("This will be an IP")}>Add Current IP</button>
            <ul>
                {IPs.map((item) => {
                    return <li>{item}</li>
                })}
            </ul>


        </>
    )
    
}