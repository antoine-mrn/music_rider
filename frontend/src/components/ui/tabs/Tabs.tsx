import type { ReactNode } from "react";

interface TabsProps {
    items: string[];
    children: ReactNode;
    activeIndex: number;
    onChange: (index: number) => void;
}

export default function Tabs({
    items,
    children,
    activeIndex,
    onChange,
}: TabsProps) {
    return (
        <div>
            <div
                role="tablist"
                className="bg-base-300 rounded-xl flex gap-1 p-1 mb-4"
            >
                {items.map((label, index) => (
                    <button
                        key={label}
                        role="tab"
                        aria-selected={activeIndex === index}
                        onClick={() => onChange(index)}
                        className={`py-2 text-base-content/50 text-sm rounded-lg flex-1 text-center cursor-pointer uppercase ${activeIndex === index && "shadow bg-base-100 text-primary"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            {children}
        </div>
    );
}
