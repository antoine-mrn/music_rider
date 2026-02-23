import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../hooks/useSignup";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import {
    type SignupSchemaType,
    SignupSchema,
} from "../../../schemas/signup.schema";
import Button from "../../../components/ui/button/Button";

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

            <Button type="submit" disabled={isPending} className="w-full p-4">
                Commencer l'aventure
            </Button>
            {isError && (
                <p className="mt-1 text-sm font-bold text-error">
                    Erreur lors de la création du compte, veuillez réessayer
                </p>
            )}
        </form>
    );
}
