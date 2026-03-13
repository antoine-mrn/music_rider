import type { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
    return (
        <div
            className={`w-full my-32 mx-auto max-w-7xl h-full px-8 ${className}`}
        >
            {children}
        </div>
    );
}
