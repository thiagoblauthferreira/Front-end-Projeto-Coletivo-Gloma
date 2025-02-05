import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth.service";
import { setCookie } from "../../../services/cookie.service";
import { ILogin } from "../../../interfaces/auth";
import { useAuthProvider } from "../../../context/Auth";
import { Input, Link, LoadingScreen } from "../../../components/common";
import { toast } from "react-toastify";
import { toastMessage } from "../../../helpers/toast-message";
import { LoginSchema } from "./validator";

function LoginPointScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
  });
  const navigate = useNavigate();
  const { loginUser, settings } = useAuthProvider();

  const [requesting, setRequesting] = React.useState<boolean>(false);

  async function onSubmit(data: ILogin) {
    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      const response = await login(data);

      setCookie("token", response.token, 7);

      loginUser();
      toast.success("Login feito com sucesso");

      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  }

  return (
    <section className="login-section">
      <LoadingScreen />

      <div className="hero min-h-screen bg-base-200 py-4">
        <div className="hero-content w-full">
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 rounded-lg">
            <div className="card-body">
              <h1 className="text-4xl pb-5 text-center font-semibold">Login</h1>

              <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="form-control">
                  <button className="btn btn-primary rounded-lg">Login</button>
                </div>
              </form>

              <Link
                href="/auth/register"
                className="link link-hover w-full text-center mt-4"
              >
                Não tem uma conta?
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

export default LoginPointScreen;
