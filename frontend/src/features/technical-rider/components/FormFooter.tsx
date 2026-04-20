import Button from "../../../components/ui/button/Button";

interface FormFooterProps {
    className?: string;
}

export default function FormFooter({ className }: FormFooterProps) {
    return (
        <div className={`mt-8 place-self-end flex gap-8 ${className ?? ""}`}>
            <div className="flex items-center gap-2">
                <div
                    aria-label="success"
                    className="status status-success"
                ></div>
                <span className="text-xs text-base-content/50">Sauvegardé</span>
            </div>
            <Button type="submit" className="">
                Enregistrer
            </Button>
        </div>
    );
}
