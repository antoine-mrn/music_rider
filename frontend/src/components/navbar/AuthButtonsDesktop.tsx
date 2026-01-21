import AuthButton from "../ui/button/AuthButton";

export default function AuthButtonsDesktop() {
    return (
        <div className="flex gap-4">
            <AuthButton to="/signin" variant="soft">
                Se connecter
            </AuthButton>
            <AuthButton to="/signup" variant="primary">
                Créer un compte
            </AuthButton>
        </div>
    );
}
