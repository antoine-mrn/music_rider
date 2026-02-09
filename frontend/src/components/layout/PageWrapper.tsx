import type { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <div className={`w-full h-full px-8 mt-10 ${className}`}>
            {children}
        </div>
    );
}
