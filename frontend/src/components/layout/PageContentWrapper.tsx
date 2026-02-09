import type { ReactNode } from "react";

interface PageContentWrapperProps {
    children: ReactNode;
    className?: string;
}

export default function PageContentWrapper({
    children,
    className,
}: PageContentWrapperProps) {
    return (
        <div
            className={`flex flex-col gap-8 place-content-center mt-16 ${className}`}
        >
            {children}
        </div>
    );
}
