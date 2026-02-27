import { Link } from "react-router";
import type { AuthUserInterface } from "../../auth/types";
import Button from "../../../components/ui/button/Button";
import Avatar from "../../../components/ui/avatar/Avatar";
import { UserRoundCog } from "lucide-react";

interface ProfileInfoProps {
    user: AuthUserInterface;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
    return (
        <section className="flex items-center gap-4">
            <Avatar src={user.avatarUrl} ring={true} size="lg" />
            <div className="flex flex-col gap-1">
                <h1 className="font-black text-4xl tracking-tight">
                    {user.firstname} {user.lastname}
                </h1>
                <p className="text-base-content/50 font-medium text-lg">
                    {user.email}
                </p>
            </div>
            <Link className="ml-auto" to="/profile/editing">
                <Button className="hidden sm:inline-block">
                    Modifier mes infos
                </Button>
                <Button className="block sm:hidden">
                    <UserRoundCog />
                </Button>
            </Link>
        </section>
    );
}
