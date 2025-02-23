import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>List all IP Addresses</p>
            <p>List all Groups</p>
            <p>List all MAC within Groups</p>
            <p>Add/Remove Groups, IP, MAC</p>
            <p>List of all active files</p>
            <p>Log out button</p>
            <Link href="/auth/logout">Log out!</Link>
        </div>
    )
}