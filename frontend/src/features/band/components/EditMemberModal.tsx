import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import Modal from "../../../components/ui/modal/Modal";
import type { BandMember } from "../types";

interface EditMemberModal {
    isOpen: boolean;
    onClose: () => void;
    member: BandMember;
}

export default function EditMemberModal({
    isOpen,
    onClose,
    member,
}: EditMemberModal) {
    const isAccountMember = member.id !== null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg mb-8">Modifier le membre</h2>
            <form>
                <div className="flex gap-2">
                    <Field>
                        <Label label="Prénom" htmlFor="firstname" />
                        <Input
                            type="text"
                            id="firstname"
                            disabled={isAccountMember}
                        />
                    </Field>
                    <Field>
                        <Label label="Nom" htmlFor="lastname" />
                        <Input
                            type="text"
                            id="lastname"
                            disabled={isAccountMember}
                        />
                    </Field>
                </div>
            </form>
        </Modal>
    );
}
