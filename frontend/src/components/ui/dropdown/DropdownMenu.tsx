interface DropdownMenuProps {
    isOpen: boolean;
    children: React.ReactNode;
}

export default function DropdownMenu({ isOpen, children }: DropdownMenuProps) {
    return (
        <ul
            className={`
                menu menu-sm absolute top-full right-0 bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow duration-200 transition-all ease-out origin-top-right
                ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 -translate-y-6 invisible"}
              `}
        >
            {children}
        </ul>
    );
}
