import { Trash } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/form/Input";
import Select from "../../../../components/ui/form/Select";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";
import { Controller, useForm } from "react-hook-form";
import {
    EditStaffMemberSchema,
    type EditStaffMemberType,
} from "../../schemas/edit-staff-member.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { GroupedStaffRaw, StaffMemberRaw } from "../../types";
import { useMemo, useState } from "react";
import { useSyncTechnicalRiderStaff } from "../../hooks/staff/useSyncTechnicalRiderStaff";

interface TechnicalStaffFormProps {
    riderId: string;
    staffData: GroupedStaffRaw;
}

type StaffTypes = "sound_engineers" | "light_engineers";

interface StaffMember extends Omit<StaffMemberRaw, "id"> {
    id: string;
    dbId: number | null;
}

interface GroupedStaff {
    sound_engineers: StaffMember[];
    light_engineers: StaffMember[];
}

const STAFF_TYPES: { type: StaffTypes; selectId: StaffTypes; label: string }[] =
    [
        {
            type: "sound_engineers",
            selectId: "sound_engineers",
            label: "Ingénieur son",
        },
        {
            type: "light_engineers",
            selectId: "light_engineers",
            label: "Ingénieur lumière",
        },
    ];

function toComparable(members: GroupedStaff) {
    const strip = ({ id, ...rest }: StaffMember) => rest;
    return {
        sound_engineers: members.sound_engineers.map(strip),
        light_engineers: members.light_engineers.map(strip),
    };
}

const DEFAULT_FORM_VALUES: EditStaffMemberType = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    type: "sound_engineers",
};

export default function TechnicalStaffForm({
    riderId,
    staffData,
}: TechnicalStaffFormProps) {
    let [savedMembers, setSavedMembers] = useState<GroupedStaff>({
        sound_engineers: staffData.sound_engineers.map((s) => ({
            ...s,
            id: crypto.randomUUID(),
            dbId: s.id,
        })),
        light_engineers: staffData.light_engineers.map((s) => ({
            ...s,
            id: crypto.randomUUID(),
            dbId: s.id,
        })),
    });

    const [members, setMembers] = useState<GroupedStaff>(savedMembers);

    const isDirty = useMemo(
        () =>
            JSON.stringify(toComparable(savedMembers)) !==
            JSON.stringify(toComparable(members)),
        [savedMembers, members],
    );

    const { mutateAsync: syncTechnicalRiderStaff, isPending } =
        useSyncTechnicalRiderStaff();

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setError,
    } = useForm<EditStaffMemberType>({
        resolver: zodResolver(EditStaffMemberSchema),
        defaultValues: DEFAULT_FORM_VALUES,
    });

    const onSubmit = handleSubmit((data) => {
        if (!data.email && !data.phone) {
            setError("root", {
                message: "Email ou numéro de téléphone requis",
            });
            return;
        }

        setMembers((prev) => ({
            ...prev,
            [data.type]: [
                ...prev[data.type],
                {
                    id: crypto.randomUUID(),
                    dbId: null,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                },
            ],
        }));

        reset(DEFAULT_FORM_VALUES);
    });

    function handleRemoveMember(type: StaffTypes, id: string) {
        setMembers((prev) => ({
            ...prev,
            [type]: prev[type].filter((p) => p.id !== id),
        }));
    }

    async function handleSave() {
        const body = {
            sound_engineers: members.sound_engineers.map(({ id, ...rest }) => ({
                ...rest,
                firstname: rest.firstname ?? "",
                lastname: rest.lastname ?? "",
                email: rest.email ?? undefined,
                phone: rest.phone ?? undefined,
            })),
            light_engineers: members.light_engineers.map(({ id, ...rest }) => ({
                ...rest,
                firstname: rest.firstname ?? "",
                lastname: rest.lastname ?? "",
                email: rest.email ?? undefined,
                phone: rest.phone ?? undefined,
            })),
        };

        await syncTechnicalRiderStaff({ riderId, body });
        setSavedMembers(members);
    }

    return (
        <RiderCard title="Equipe technique">
            <form
                onSubmit={onSubmit}
                className="bg-base-200 p-4 rounded-md shadow"
            >
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                        <Controller
                            name="firstname"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="text"
                                    placeholder="Prénom"
                                    {...field}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>
                    <div className="col-span-2">
                        <Controller
                            name="lastname"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Input
                                    type="text"
                                    placeholder="Nom"
                                    {...field}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </div>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                type="mail"
                                placeholder="email"
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
                    />{" "}
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                type="phone"
                                placeholder="+33 6 12 34 56 78"
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                className="col-span-2"
                                defaultOption="Mission"
                                values={STAFF_TYPES.map((staff) => ({
                                    id: staff.selectId,
                                    label: staff.label,
                                }))}
                                {...field}
                                error={fieldState.error?.message}
                            />
                        )}
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
                <StaffList
                    titleColor="primary"
                    title="Son"
                    members={members.sound_engineers}
                    type="sound_engineers"
                    onRemove={handleRemoveMember}
                />
                <StaffList
                    titleColor="secondary"
                    title="Lumière"
                    members={members.light_engineers}
                    type="light_engineers"
                    onRemove={handleRemoveMember}
                />
            </div>
            <FormFooter
                onSave={handleSave}
                isDirty={isDirty}
                isPending={isPending}
                error={null}
            />
        </RiderCard>
    );
}

function StaffList({
    titleColor,
    title,
    members,
    type,
    onRemove,
}: {
    titleColor: string;
    title: string;
    members: StaffMember[];
    type: StaffTypes;
    onRemove: (type: StaffTypes, id: string) => void;
}) {
    return (
        <div>
            <h3 className={`text-${titleColor} uppercase italic font-semibold`}>
                {title}
            </h3>

            {members.length > 0 ? (
                <ul className="mt-2 space-y-2">
                    {members.map((member) => (
                        <li key={member.id} className="space-y-2">
                            <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold italic">
                                        {member.firstname} {member.lastname}
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        {member.email}
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        {member.phone}
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    onClick={() => onRemove(type, member.id)}
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
            ) : (
                <span className="italic font-bold text-xs">
                    Pas encore de staff
                </span>
            )}
        </div>
    );
}
