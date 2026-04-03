import type { ReactNode } from "react";

interface TabsProps<T extends string> {
    items: { label: string; mode: T }[];
    children: ReactNode;
    activeMode: T;
    onChange: (tab: { label: string; mode: T }) => void;
}

export default function Tabs<T extends string>({
    items,
    children,
    activeMode,
    onChange,
}: TabsProps<T>) {
    return (
        <div>
            <div
                role="tablist"
                className="bg-base-300 rounded-xl flex gap-1 p-1 mb-4"
            >
                {items.map((item) => (
                    <button
                        type="button"
                        key={item.mode}
                        role="tab"
                        aria-selected={activeMode === item.mode}
                        onClick={() => onChange(item)}
                        className={`py-2 text-base-content/50 text-sm font-black rounded-lg flex-1 text-center cursor-pointer uppercase ${activeMode === item.mode && "shadow bg-base-100 text-primary"}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            {children}
        </div>
    );
}
