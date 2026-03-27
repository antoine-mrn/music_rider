import Modal from "../../../components/ui/modal/Modal";

export default function AddMemberToBandDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg">Ajouter un membre au groupe</h2>
            <div className="tabs tabs-box rounded-xl mt-8">
                <input
                    type="radio"
                    name="add-member-mode"
                    className="tab rounded-xl px-8 checked:text-primary"
                    aria-label="Via un compte"
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    Tab content 1
                </div>

                <input
                    type="radio"
                    name="add-member-mode"
                    className="tab rounded-xl px-8"
                    aria-label="Personnalisé"
                    defaultChecked
                />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    Tab content 2
                </div>
            </div>
        </Modal>
    );
}
