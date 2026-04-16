import { useParams } from "react-router";
import Button from "../../../components/ui/button/Button";
import Modal from "../../../components/ui/modal/Modal";
import { useDeleteMembership } from "../hooks/useDeleteMembership";

interface DeleteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    membershipId: number;
}

export default function DeleteMemberModal({
    isOpen,
    onClose,
    membershipId,
}: DeleteMemberModalProps) {
    const { bandId } = useParams();

    const {
        mutateAsync: deleteMembership,
        isPending,
        isError,
    } = useDeleteMembership();

    async function handleConfirm() {
        if (!bandId) return;

        try {
            await deleteMembership({ bandId, membershipId });
            onClose();
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg my-8 text-center">
                Êtes vous sûr de vouloir supprimer le membre du groupe ?{" "}
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1 uppercase italic font-black py-4 sm:py-0"
                    variant="soft"
                >
                    Annuler
                </Button>
                <Button
                    onClick={handleConfirm}
                    type="submit"
                    className="flex-1 uppercase italic font-black py-4 sm:py-0"
                >
                    {isPending ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        <span>Confirmer</span>
                    )}
                </Button>
            </div>
            {isError && (
                <span className="block text-center mb-1 text-sm font-bold text-error">
                    Erreur pendant la suppression du membre
                </span>
            )}
        </Modal>
    );
}
