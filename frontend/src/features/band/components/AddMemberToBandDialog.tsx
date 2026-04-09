import { useRef, useState } from "react";
import Modal from "../../../components/ui/modal/Modal";
import Tabs from "../../../components/ui/tabs/Tabs";
import AccountTabContent from "./AccountTabContent";
import CustomTabContent from "./CustomTabContent";
import Button from "../../../components/ui/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import {
    type AddMemberToBandType,
    AddMemberToBandSchema,
} from "../../../schemas/add-member-to-band.schema";
import { useAddMembership } from "../hooks/useAddMembership";
import { useParams } from "react-router";
import InstrumentPicker, {
    type InstrumentPickerHandle,
} from "../../instrument/components/InstrumentPicker";

type Tab = {
    label: string;
    mode: "account" | "custom";
};

const TABS: Tab[] = [
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
    const instrumentPickerRef = useRef<InstrumentPickerHandle>(null);
    const { bandId } = useParams();
    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    function handleSelectedTab(tabSelected: Tab) {
        setSelectedTab(tabSelected);
        setValue("mode", tabSelected.mode);
    }

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<AddMemberToBandType>({
        resolver: zodResolver(AddMemberToBandSchema),
        defaultValues: { mode: "account", instrumentId: [] },
    });

    const { mutateAsync: AddMembership, isPending, error } = useAddMembership();

    const onSubmit = handleSubmit(async (data) => {
        if (!bandId) return;

        try {
            await AddMembership({ bandId, memberData: data });
            handleClose();
        } catch (error) {}
    });

    function handleClose() {
        reset({ mode: "account", instrumentId: [] });
        setSelectedTab(TABS[0]);
        instrumentPickerRef.current?.resetInstrumentPickerState();
        onClose();
    }

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
            <form className="space-y-8">
                <Tabs
                    items={TABS}
                    activeMode={selectedTab.mode}
                    onChange={handleSelectedTab}
                >
                    {selectedTab.mode === "account" ? (
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

                {/* Field instrument */}
                <InstrumentPicker
                    ref={instrumentPickerRef}
                    value={watch("instrumentId")}
                    onChange={(ids) => setValue("instrumentId", ids)}
                />

                {/* form submit */}
                <div>
                    {error && (
                        <span className="block text-center mb-1 text-sm font-bold text-error">
                            {error.message}
                        </span>
                    )}
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button
                            onClick={handleClose}
                            disabled={isPending}
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
                            {isPending ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <span>Confirmer</span>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
