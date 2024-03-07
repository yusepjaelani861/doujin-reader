import { PropsWithChildren } from "react";
import Header from "@/components/Header";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-white">
            <Header />

            <main className="max-w-7xl mx-auto p-4">
                {children}
            </main>
        </div>
    )
}

export default MainLayout