import { useEffect, useRef, type ReactNode } from "react";
import Button from "../button/Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        isOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            {isOpen && (
                <>
                    <div
                        className="modal-box"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form method="dialog">
                            <Button
                                className="absolute right-2 top-2"
                                size="sm"
                                variant="secondary"
                            >
                                x
                            </Button>
                        </form>
                        {children}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </>
            )}
        </dialog>
    );
}
