import "../public/index.css"

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className="w-full h-full fancy-gradient flex justify-center items-center">
        <body className="flex w-[calc(100%-4rem)] h-[calc(100%-4rem)] justify-center items-center bg-background rounded-2xl overflow-hidden">
            {children}
        </body>
        </html>
        
    );
}
