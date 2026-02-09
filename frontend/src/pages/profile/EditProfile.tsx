import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import EditProfileForm from "../../features/profile/components/EditProfileForm";
import { useMeEdit } from "../../features/profile/hooks/useMeEdit";
import { useUpdateMe } from "../../features/profile/hooks/useUpdateMe";

export default function EditProfile() {
    const { data: me, isLoading } = useMeEdit();
    const { mutateAsync: updateMe, isPending } = useUpdateMe();

    if (isLoading || !me) return <p>Je charge</p>;

    return (
        <PageWrapper className="max-w-4xl">
            <PageTitle title="Préférences" />
            <PageContentWrapper>
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
            </PageContentWrapper>
        </PageWrapper>
    );
}
