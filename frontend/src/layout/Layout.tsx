import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type Props = { children?: ReactNode }

const Layout = ({ children }: Props) => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="p-4 bg-blue-600 text-white">
                <h1 className="text-xl font-bold">App Template</h1>
            </header>

            <main className="p-4">
                {children}
                <Outlet /> {/* per React Router */}
            </main>

            <footer className="p-4 bg-gray-200 text-center">
                © 2026 Template
            </footer>
        </div>
    )
}

export default Layout