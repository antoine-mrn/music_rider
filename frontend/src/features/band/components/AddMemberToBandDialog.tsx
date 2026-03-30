import { useState } from "react";
import Modal from "../../../components/ui/modal/Modal";
import Tabs from "../../../components/ui/tabs/Tabs";
import AccountTabContent from "./AccountTabContent";
import CustomTabContent from "./CustomTabContent";
import Field from "../../../components/ui/form/Field";
import Label from "../../../components/ui/form/Label";
import Input from "../../../components/ui/form/Input";
import Button from "../../../components/ui/button/Button";

const TABS = ["Via un compte", "Personnalisé"];

export default function AddMemberToBandDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg mb-8">
                Ajouter un membre au groupe
            </h2>
            <form className="space-y-4">
                <Tabs
                    items={TABS}
                    activeIndex={selectedTab}
                    onChange={setSelectedTab}
                >
                    {selectedTab === 0 ? (
                        <AccountTabContent />
                    ) : (
                        <CustomTabContent />
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
