import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FormFieldConstructor } from "../../../components/common/FormField";
import { LoginSchema } from "../../../validators/login.validator";
import { login } from "../../../services/auth.service";
import { setCookie } from "../../../services/cookie.service";
import { ILogin } from "../../../interfaces/auth";
import { useAuthProvider } from "../../../context/Auth";
import { LoadingScreen } from "../../../components/common";
import { toast } from "react-toastify";
import { toastMessage } from "../../../helpers/toast-message";

interface LoginComponentProps {}

function LoginPointScreen(props: LoginComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const { loginUser } = useAuthProvider();

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

  const FormField = FormFieldConstructor<ILogin>();

  return (
    <section className="login-section">
      <LoadingScreen />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex flex-col">
          <div className="text-center">
            <h1 className="text-5xl pb-5 font-bold">Login</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:px-10">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="email"
                register={register}
                setError={setError}
                error={errors?.email}
                inputProps={{
                  type: "email",
                  placeholder: "Seu Email",
                }}
              />
              <FormField
                name="password"
                register={register}
                setError={setError}
                error={errors.password}
                inputProps={{
                  type: "password",
                  placeholder: "Sua senha",
                }}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Esqueceu a senha?
                </a>
              </label>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <label className="label">
                <Link to={"/auth/register"} className="label-text-alt link link-hover">
                  Não tem uma conta?
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPointScreen;
