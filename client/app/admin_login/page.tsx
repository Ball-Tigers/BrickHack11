import Link from "next/link";

export default function AdminLogin() {
    return (
        <div>
            <h1>Admin Login Page</h1>
            <p>Do login with Auth0</p>
            <Link href='/admin_dashboard'>To Admin Dashboard</Link>
        </div>
    );
}