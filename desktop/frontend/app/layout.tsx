import Link from 'next/link';
import '../public/index.css'

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className="w-full h-full">
        <body className="w-full h-full flex grow bg-background">
            {children}
            <Link 
                className='absolute bottom-0 left-0 m-4 bg-primary p-2 rounded-full'
                href='/'
            >
                <img
                    src='/home.png'
                    alt='home'
                    className='w-[3rem]'
                />
            </Link>
        </body>
        </html>
    );
}
