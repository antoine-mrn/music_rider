import { useForm } from "react-hook-form";
import {
    SignupSchema,
    type SignupSchemaType,
} from "../../schemas/signup.schema";
import Field from "../form/Field";
import Input from "../form/Input";
import Label from "../form/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../../features/auth/hooks/useSignup";

export default function SignupForm() {
    const { mutateAsync: signup, isPending, isError } = useSignup();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(SignupSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const { confirmPassword, ...signupDto } = data;
        await signup(signupDto);
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
                <Label label="Prénom" htmlFor="firstname" />
                <Input
                    type="text"
                    id="firstname"
                    placeholder="John"
                    {...register("firstname")}
                    error={errors.firstname && errors.firstname.message}
                />
            </Field>
            <Field>
                <Label label="Nom" htmlFor="lastname" />
                <Input
                    type="text"
                    id="lastname"
                    placeholder="Lennon"
                    {...register("lastname")}
                    error={errors.lastname && errors.lastname.message}
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
            <Field>
                <Label
                    label="Confirmez le mot de passe"
                    htmlFor="confirm-password"
                />
                <Input
                    type="password"
                    id="confirm-password"
                    placeholder="********"
                    {...register("confirmPassword")}
                    error={
                        errors.confirmPassword && errors.confirmPassword.message
                    }
                />
            </Field>

            <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary w-full p-4"
            >
                Commencer l'aventure
            </button>
            {isError && (
                <p className="mt-1 text-sm font-bold text-error">
                    Erreur lors de la création du compte, veuillez réessayer
                </p>
            )}
        </form>
    );
}
