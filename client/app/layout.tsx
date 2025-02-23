import "../public/index.css"

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className="fancy-gradient">
            {children}
        </body>
        </html>
    );
}
