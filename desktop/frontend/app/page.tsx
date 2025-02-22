import Link from "next/link";

export default function DesktopHome() {
    return (
        <div>
            <h1>DesktopHome</h1>
            <p>Button to go to upload</p>
            <Link href='/user_upload_file'>Upload</Link>
            <br />
            <p>Box to take in download codes</p>
            <p>Button to go to download</p>
            <Link href='/user_download_file'></Link>
        </div>
    )
}   