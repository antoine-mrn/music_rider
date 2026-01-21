import { Link } from "react-router";
import AuthButton from "../ui/button/AuthButton";
import DropdownMenu from "../ui/dropdown/DropdownMenu";
import DropdownMenuTitle from "../ui/dropdown/DropdownMenuTitle";

export default function AuthMenuMobile({ isOpen }: { isOpen: boolean }) {
    return (
        <DropdownMenu isOpen={isOpen}>
            <DropdownMenuTitle title="Connexion" />

            <li className="flex flex-col gap-3 mt-2">
                <AuthButton to="/signin" variant="soft">
                    Se connecter
                </AuthButton>
                <AuthButton to="/signup" variant="primary">
                    Créer un compte
                </AuthButton>
            </li>

            <div className="divider opacity-50"></div>

            <li>
                <Link to="/about">À propos</Link>
            </li>
            <li>
                <Link to="/contact">Besoin d'aide ?</Link>
            </li>
        </DropdownMenu>
    );
}
