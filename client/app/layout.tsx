import { CookiesProvider } from 'next-client-cookies/server';


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
            <CookiesProvider>{children}</CookiesProvider>
        </body>
        </html>
        
    );
}
