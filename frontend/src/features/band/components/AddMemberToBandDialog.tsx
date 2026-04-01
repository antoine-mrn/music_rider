import { useState } from "react";
import Modal from "../../../components/ui/modal/Modal";
import Tabs from "../../../components/ui/tabs/Tabs";
import AccountTabContent from "./AccountTabContent";
import CustomTabContent from "./CustomTabContent";
import Field from "../../../components/ui/form/Field";
import Label from "../../../components/ui/form/Label";
import Input from "../../../components/ui/form/Input";
import Button from "../../../components/ui/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import {
    type AddMemberToBandType,
    AddMemberToBandSchema,
} from "../../../schemas/add-member-to-band.schema";
import { useFindAllInstrument } from "../../instrument/hooks/useFindAllInstrument";

const TABS = [
    { label: "Via un compte", mode: "account" },
    { label: "Personnalisé", mode: "custom" },
];

export default function AddMemberToBandDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [selectedTab, setSelectedTab] = useState(0);
    const { data } = useFindAllInstrument();
    console.log("🚀 ~ AddMemberToBandDialog ~ data:", data);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddMemberToBandType>({
        resolver: zodResolver(AddMemberToBandSchema),
    });

    const errorsAccount = errors as FieldErrors<
        Extract<AddMemberToBandType, { mode: "account" }>
    >;
    const errorsCustom = errors as FieldErrors<
        Extract<AddMemberToBandType, { mode: "custom" }>
    >;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg mb-8">
                Ajouter un membre au groupe
            </h2>
            <form className="space-y-6">
                <Tabs
                    items={TABS}
                    activeIndex={selectedTab}
                    onChange={setSelectedTab}
                >
                    {selectedTab === 0 ? (
                        <AccountTabContent
                            register={register}
                            errors={errorsAccount.email?.message}
                        />
                    ) : (
                        <CustomTabContent
                            register={register}
                            errors={errorsCustom}
                        />
                    )}
                </Tabs>

                <Field>
                    <Label label="Instruments joués" htmlFor="instrument" />
                    <Input placeholder="Guitare" id="instrument" />
                </Field>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        className="flex-1 uppercase italic font-black py-4 sm:py-0"
                        variant="soft"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 uppercase italic font-black py-4 sm:py-0"
                    >
                        Confirmer
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
