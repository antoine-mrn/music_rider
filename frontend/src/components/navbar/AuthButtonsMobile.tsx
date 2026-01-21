import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import AuthMenuMobile from "./AuthMenuMobile";

export default function AuthButtonsMobile() {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className="dropdown dropdown-end">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle swap swap-rotate"
            >
                <input type="checkbox" checked={isOpen} readOnly />

                <svg
                    className="swap-off fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M4,6H20V8H4ZM4,11H20V13H4ZM4,16H20V18H4Z" />
                </svg>

                <svg
                    className="swap-on fill-current w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </button>

            <AuthMenuMobile isOpen={isOpen} />
        </div>
    );
}
