import ErrorInfo from "../../components/layout/ErrorInfo";
import Loading from "../../components/layout/Loading";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import EditProfileForm from "../../features/profile/components/EditProfileForm";
import { useMeEdit } from "../../features/profile/hooks/useMeEdit";
import { useUpdateMe } from "../../features/profile/hooks/useUpdateMe";
import UpdateAvatarForm from "../../features/profile/components/UpdateAvatarForm";
import { useUpdateAvatar } from "../../features/profile/hooks/useUpdateAvatar";

export default function EditProfile() {
    const { data: me, isLoading, isError, refetch } = useMeEdit();
    const { mutateAsync: updateMe, isPending: isUpdateMePending } =
        useUpdateMe();
    const { mutateAsync: updateAvatar, isPending: isUpdateAvatarPending } =
        useUpdateAvatar();

    if (isLoading || !me) return <Loading />;
    if (isError) return <ErrorInfo onRetry={refetch} />;

    return (
        <PageWrapper className="max-w-4xl">
            <PageTitle title="Mon profil" />
            <PageContentWrapper>
                <UpdateAvatarForm
                    currentAvatar={me?.avatarUrl ?? "/default-avatar.png"}
                    updateAvatar={updateAvatar}
                    isPending={isUpdateAvatarPending}
                />
                <EditProfileForm
                    me={me}
                    updateMe={updateMe}
                    isPending={isUpdateMePending}
                />
            </PageContentWrapper>
        </PageWrapper>
    );
}
