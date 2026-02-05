import { useMeEdit } from "../../features/user/hooks/useMeEdit";
import { useUpdateMe } from "../../features/user/hooks/useUpdateMe";
import EditProfileForm from "../../components/profile/EditProfileForm";

export default function EditProfile() {
    const { data: me, isLoading } = useMeEdit();
    const { mutateAsync: updateMe, isPending } = useUpdateMe();

    if (isLoading || !me) return <p>Je charge</p>;

    return (
        <div className="h-full max-w-4xl mx-auto flex flex-col gap-8 place-content-center px-8 mt-10">
            <section className="card w-full card-border border-2 p-4">
                <div className="card-body flex-row items-center gap-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="btn btn-primary rounded-lg uppercase italic font-black">
                            Changer la photo
                        </button>
                        <span className="text-base-content/50 font-black">
                            JPG, PNG ou GIF. Max 2MB.
                        </span>
                    </div>
                </div>
            </section>

            <EditProfileForm
                me={me}
                updateMe={updateMe}
                isPending={isPending}
            />
        </div>
    );
}
