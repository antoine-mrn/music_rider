import { useEffect, useState } from "react";
import Button from "../../../components/ui/button/Button";

interface UpdateAvatarFormProps {
    currentAvatar: string;
    updateAvatar: (avatarFormData: FormData) => Promise<void>;
    isPending: boolean;
}

export default function UpdateAvatarForm({
    currentAvatar,
    updateAvatar,
    isPending,
}: UpdateAvatarFormProps) {
    const [avatar, setAvatar] = useState(currentAvatar);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    function handleNewAvatar(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];

        if (file.size > 3 * 1024 * 1024) {
            setError("L'avatar doit être inférieur à 3MO");
            return;
        }

        if (
            !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                file.type,
            )
        ) {
            setError("Format invalide");
            return;
        }

        setAvatar(URL.createObjectURL(file));
        setSelectedFile(file);
        setError("");
    }

    function handleUpdateAvatar(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedFile) return;

        const avatarFormData = new FormData();
        avatarFormData.append("file", selectedFile);

        updateAvatar(avatarFormData);
    }

    useEffect(() => {
        return () => {
            if (avatar.startsWith("blob:")) {
                URL.revokeObjectURL(avatar);
            }
        };
    }, [avatar]);

    return (
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
                            disabled={isPending}
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
    );
}
