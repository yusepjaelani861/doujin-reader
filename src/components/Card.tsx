import { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
    return (
        <div className={`bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm ${className && className}`}>
            {children}
        </div>
    )
}

export default Card
