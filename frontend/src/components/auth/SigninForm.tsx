import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    type SigninSchemaType,
    SigninSchema,
} from "../../schemas/signin.schema";
import Field from "../ui/form/Field";
import Input from "../ui/form/Input";
import Label from "../ui/form/Label";
import { useLogin } from "../../features/auth/hooks/useLogin";

export default function SigninForm() {
    const { mutateAsync: signin, isPending, isError } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninSchemaType>({
        resolver: zodResolver(SigninSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        await signin(data);
    });
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <Field>
                <Label label="e-mail" htmlFor="email" />
                <Input
                    type="email"
                    id="email"
                    placeholder="john.doe@mail.com"
                    {...register("email")}
                    error={errors.email && errors.email.message}
                />
            </Field>
            <Field>
                <Label label="Mot de passe" htmlFor="password" />
                <Input
                    type="password"
                    id="password"
                    placeholder="********"
                    {...register("password")}
                    error={errors.password && errors.password.message}
                />
            </Field>

            <div>
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn btn-primary w-full p-4"
                >
                    Se connecter
                </button>
                {isError && (
                    <p className="mt-1 text-sm font-bold text-error text-center">
                        Erreur lors de la connexion au compte, veuillez
                        réessayer
                    </p>
                )}
            </div>
        </form>
    );
}
