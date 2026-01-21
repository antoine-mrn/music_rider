import AuthButtonsDesktop from "./AuthButtonsDesktop";
import AuthButtonsMobile from "./AuthButtonsMobile";

export default function AuthButtonsWrapper() {
    return (
        <>
            <div className="hidden lg:block">
                <AuthButtonsDesktop />
            </div>
            <div className="block lg:hidden">
                <AuthButtonsMobile />
            </div>
        </>
    );
}
