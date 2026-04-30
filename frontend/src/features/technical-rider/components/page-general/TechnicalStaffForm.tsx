import { Trash } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/form/Input";
import Select from "../../../../components/ui/form/Select";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    EditStaffMemberSchema,
    type EditStaffMemberType,
} from "../../schemas/edit-staff-member.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type StaffTypes = "sound" | "light";

interface StaffMember {
    id: string;
    name: string;
    email: string;
    phone: string;
}

const STAFF_TYPES: { type: StaffTypes; selectId: StaffTypes; label: string }[] =
    [
        { type: "sound", selectId: "sound", label: "Ingénieur son" },
        { type: "light", selectId: "light", label: "Ingénieur lumière" },
    ];

export default function TechnicalStaffForm() {
    const [members, setMembers] = useState<Record<StaffTypes, StaffMember[]>>({
        sound: [],
        light: [],
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm<EditStaffMemberType>({
        resolver: zodResolver(EditStaffMemberSchema),
    });

    //     function handleNewStaffMember(formData: FormData) {
    //         const name = formData.get("name") as string;
    //         const email = formData.get("email") as string;
    //         const phone = formData.get("phone") as string;
    //         const type = formData.get("type") as StaffTypes;
    //
    //         const newMember = { id: crypto.randomUUID(), name, email, phone };
    //
    //         setMembers((prev) => ({ ...prev, [type]: [...prev[type], newMember] }));
    //     }

    const onSubmit = handleSubmit(async (data) => {
        if (!data.email || !data.phone) {
            setError("root", {
                message: "Email ou numéro de téléphone requis",
            });
        }
        console.log(data);
    });

    function handleRemoveMember(type: StaffTypes, id: string) {
        setMembers((prev) => ({
            ...prev,
            [type]: prev[type].filter((p) => p.id !== id),
        }));
    }

    return (
        <RiderCard title="Equipe technique">
            <form
                onSubmit={onSubmit}
                className="bg-base-200 p-4 rounded-md shadow"
            >
                <div className="grid grid-cols-2 gap-2">
                    <Input
                        type="text"
                        placeholder="Prénom Nom"
                        className="col-span-2"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                    <Input
                        type="mail"
                        placeholder="john.doe@gmail.com"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                    <Input
                        type="phone"
                        placeholder="+33 6 12 34 56 78"
                        {...register("phone")}
                        error={errors.phone?.message}
                    />
                    <Select
                        className="col-span-2"
                        defaultOption="Mission"
                        values={STAFF_TYPES.map((staff) => ({
                            id: staff.selectId,
                            label: staff.label,
                        }))}
                        {...register("type")}
                        error={errors.type?.message}
                    />
                </div>
                <div className="mt-2 w-full flex flex-col">
                    <Button type="submit">Ajouter à l'équipe</Button>
                    {errors.root?.message && (
                        <p className="mt-1 text-sm font-bold text-error text-center">
                            {errors.root.message}
                        </p>
                    )}
                </div>
            </form>

            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="text-primary uppercase italic font-semibold">
                        Audio
                    </h3>
                    <ul className="mt-2 space-y-2">
                        {members.sound.map((member, index) => (
                            <li key={index} className="space-y-2">
                                <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm uppercase italic">
                                            {member.name}
                                        </span>
                                        <span className="text-xs text-base-content/50">
                                            {member.email}
                                        </span>
                                        <span className="text-xs text-base-content/50">
                                            {member.phone}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleRemoveMember(
                                                "light",
                                                member.id,
                                            )
                                        }
                                        variant="ghost"
                                        size="sm"
                                        shape="circle"
                                        className="text-error p-1"
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-secondary uppercase italic font-semibold">
                        Lumière
                    </h3>
                    <ul className="mt-2 space-y-2">
                        {members.light.map((member, index) => (
                            <li key={index} className="space-y-2">
                                <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm uppercase italic">
                                            {member.name}
                                        </span>
                                        <span className="text-xs text-base-content/50">
                                            {member.email}
                                        </span>
                                        <span className="text-xs text-base-content/50">
                                            {member.phone}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleRemoveMember(
                                                "light",
                                                member.id,
                                            )
                                        }
                                        variant="ghost"
                                        size="sm"
                                        shape="circle"
                                        className="text-error p-1"
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <FormFooter isDirty={false} isPending={false} error={null} />
        </RiderCard>
    );
}

function StaffList({
    titleColor,
    title,
    members,
    onRemove,
}: {
    titleColor: string;
    title: string;
    members: StaffMember[];
    onRemove: (type: StaffTypes, id: string) => void;
}) {
    return (
        <div>
            <h3 className={`${titleColor} uppercase italic font-semibold`}>
                {title}
            </h3>
            <ul className="mt-2 space-y-2">
                {members.map((member, index) => (
                    <li key={index} className="space-y-2">
                        <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                            <div className="flex flex-col">
                                <span className="font-bold text-sm uppercase italic">
                                    {member.name}
                                </span>
                                <span className="text-xs text-base-content/50">
                                    {member.email}
                                </span>
                                <span className="text-xs text-base-content/50">
                                    {member.phone}
                                </span>
                            </div>
                            <Button
                                onClick={() => onRemove("light", member.id)}
                                variant="ghost"
                                size="sm"
                                shape="circle"
                                className="text-error p-1"
                            >
                                <Trash />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
