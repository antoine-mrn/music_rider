import { useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    callback: () => void,
) => {
    useEffect(() => {
        function handleClickOutside(e: Event) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};
