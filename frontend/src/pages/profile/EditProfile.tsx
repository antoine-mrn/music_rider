import ErrorInfo from "../../components/layout/ErrorInfo";
import Loading from "../../components/layout/Loading";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/button/Button";
import PageTitle from "../../components/ui/typography/PageTitle";
import EditProfileForm from "../../features/profile/components/EditProfileForm";
import { useMeEdit } from "../../features/profile/hooks/useMeEdit";
import { useUpdateMe } from "../../features/profile/hooks/useUpdateMe";
import { useState } from "react";
import { useUpdateAvatar } from "../../features/profile/hooks/useUpdateavatar";

export default function EditProfile() {
    const { data: me, isLoading, isError, refetch } = useMeEdit();
    const { mutateAsync: updateMe, isPending: isUpdateMePending } =
        useUpdateMe();
    const { mutateAsync: updateAvatar, isPending: isUpdateAvatarPending } =
        useUpdateAvatar();

    const [avatar, setAvatar] = useState(
        me?.avatarUrl ?? "/default-avatar.png",
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    if (isLoading || !me) return <Loading />;
    if (isError) return <ErrorInfo onRetry={refetch} />;

    function handleNewAvatar(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

        if (file.size > 3 * 1024 * 1024) {
            setError("L'avatar doit être inférieur à 3MO");
            return;
        }

        setAvatar(URL.createObjectURL(file));
        setSelectedFile(file);
        setError("");
    }

    async function handleUpdateAvatar(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedFile) return;

        const avatarFormData = new FormData();
        avatarFormData.append("file", selectedFile);

        await updateAvatar(avatarFormData);
    }

    return (
        <PageWrapper className="max-w-4xl">
            <PageTitle title="Préférences" />
            <PageContentWrapper>
                <section className="card w-full card-border border-2 p-4">
                    <form onSubmit={handleUpdateAvatar}>
                        <div className="card-body flex-row items-center gap-4">
                            <label className="relative group w-24 h-24 cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleNewAvatar}
                                    className="hidden"
                                />

                                <img
                                    src={avatar}
                                    alt="avatar"
                                    className="w-24 h-24 rounded-full object-cover"
                                />

                                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <span className="text-white text-xs font-bold uppercase">
                                        Modifier
                                    </span>
                                </div>
                            </label>
                            <div className="flex flex-col gap-4">
                                <Button
                                    disabled={isUpdateAvatarPending}
                                    type="submit"
                                    className="uppercase italic font-black"
                                >
                                    Changer la photo
                                </Button>
                                <span className="text-base-content/50 font-black">
                                    JPG, PNG ou WEBP. Max 3MO.
                                </span>
                                {error && (
                                    <span className="text-error text-sm font-semibold">
                                        {error}
                                    </span>
                                )}
                            </div>
                        </div>
                    </form>
                </section>

                <EditProfileForm
                    me={me}
                    updateMe={updateMe}
                    isPending={isUpdateMePending}
                />
            </PageContentWrapper>
        </PageWrapper>
    );
}
