import Link from "next/link";

export default function UserJoinGroup() {
    return (
        <div>
            <h1>User Join Group</h1>
            <p>Pretty or simple background</p>
            <p>Button to accept, brings to home page</p>
            <Link href='/'>Home Page</Link>
        </div>
    );
}