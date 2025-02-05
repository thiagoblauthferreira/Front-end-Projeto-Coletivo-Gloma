import React from "react";
import { createUser } from "../../../services/auth.service";
import { Input, Link, LoadingScreen } from "../../../components/common";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../../context/Auth";
import { toast } from "react-toastify";
import { toastMessage } from "../../../helpers/toast-message";
import { setCookie } from "../../../services/cookie.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./validator";
import { IRegister } from "./interface";

function SignUpScreen() {
  const navigate = useNavigate();
  const { loginUser, settings } = useAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
  });

  const [requesting, setRequesting] = React.useState<boolean>(false);

  async function onSubmit(data: IRegister) {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    console.log(data);

    try {
      setRequesting(true);

      const response = await createUser({
        ...data,
        isCoordinator: data.isCoordinator || false,
      });

      setCookie("token", response.token, 7);

      loginUser();
      toast.success("Cadastro feito com sucesso");

      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  }

  return (
    <section className="signup-section">
      <LoadingScreen />

      <div className="hero min-h-screen bg-base-200 py-4">
        <div className="hero-content w-full">
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 rounded-lg">
            <div className="card-body">
              <h1 className="text-4xl pb-5 text-center font-semibold">Cadastro</h1>

              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Nome: "
                  placeholder="Digite o seu nome"
                  {...register("name")}
                  errors={errors}
                />

                <Input
                  label="Nome de usuário: "
                  placeholder="Digite o seu nome de usuário"
                  {...register("username")}
                  errors={errors}
                />

                <Input
                  label="Email: "
                  type="email"
                  placeholder="Digite o seu email"
                  {...register("email")}
                  errors={errors}
                />

                <Input
                  label="Senha: "
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                  errors={errors}
                />

                <Input
                  label="Confirmar senha: "
                  type="password"
                  placeholder="Confirme sua senha"
                  {...register("confirm")}
                  errors={errors}
                />

                <label className="cursor-pointer label">
                  <span className="label-text text-lg">Sou coordenador de abrigo</span>
                  <input
                    {...register("isCoordinator")}
                    type="checkbox"
                    className="checkbox checkbox-accent"
                  />
                </label>

                <div className="form-control">
                  <button className="btn btn-primary rounded-lg">Login</button>
                </div>
              </form>

              <Link
                href="/auth/login"
                className="link link-hover w-full text-center mt-4"
              >
                Já possuo uma conta
              </Link>

              <Link
                href={settings.support}
                className="link text-blue-500 hover:text-blue-600 underline w-full text-center mt-4"
              >
                suporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpScreen;
