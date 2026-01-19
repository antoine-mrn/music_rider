import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    type SigninSchemaType,
    SigninSchema,
} from "../../schemas/signin.schema";
import Field from "../form/Field";
import Input from "../form/Input";
import Label from "../form/Label";
import { useLogin } from "../../features/auth/hooks/useLogin";

export default function SigninForm() {
    const { mutateAsync: signin } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninSchemaType>({
        resolver: zodResolver(SigninSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
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

            <button type="submit" className="btn btn-primary w-full p-4">
                Se connecter
            </button>
        </form>
    );
}
