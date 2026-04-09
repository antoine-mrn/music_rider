import { useRef } from "react";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import Modal from "../../../components/ui/modal/Modal";
import InstrumentPicker, {
    type InstrumentPickerHandle,
} from "../../instrument/components/InstrumentPicker";
import type { BandMember } from "../types";
import {
    EditMemberToBandSchema,
    type EditMemberToBandType,
} from "../../../schemas/edit-member.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../components/ui/button/Button";

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
    const instrumentPickerRef = useRef<InstrumentPickerHandle>(null);
    const isAccountMember = member.id !== null;

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<EditMemberToBandType>({
        resolver: zodResolver(EditMemberToBandSchema),
        defaultValues: {
            firstname: member.firstname,
            lastname: member.lastname,
            instrumentId: member.instruments.map((i) => i.id),
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
    });

    function handleClose() {
        return;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg mb-8">Modifier le membre</h2>
            <form className="space-y-8">
                <div className="flex gap-2">
                    <Field>
                        <Label label="Prénom" htmlFor="firstname" />
                        <Input
                            type="text"
                            id="firstname"
                            {...register("firstname")}
                            error={errors.firstname?.message}
                            disabled={isAccountMember}
                        />
                    </Field>
                    <Field>
                        <Label label="Nom" htmlFor="lastname" />
                        <Input
                            type="text"
                            id="lastname"
                            {...register("lastname")}
                            error={errors.lastname?.message}
                            disabled={isAccountMember}
                        />
                    </Field>
                </div>
                <InstrumentPicker
                    ref={instrumentPickerRef}
                    value={watch("instrumentId")}
                    initialInstruments={member.instruments}
                    onChange={(ids) => setValue("instrumentId", ids)}
                    error={errors.instrumentId?.message}
                />
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        onClick={handleClose}
                        // disabled={isPending}
                        className="flex-1 uppercase italic font-black py-4 sm:py-0"
                        variant="soft"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={onSubmit}
                        type="submit"
                        className="flex-1 uppercase italic font-black py-4 sm:py-0"
                    >
                        {/* {isPending ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <span>Confirmer</span>
                        )} */}
                        Confirmer
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
