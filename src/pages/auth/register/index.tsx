import AdressStep from "./SignUpSteps/Adress/AdressStep";
import React, { useState } from "react";
import { PersonalInfosStep } from "./SignUpSteps/PersonalInfos/PersonalInfos";
import { register } from "../../../services/auth.service";
import { LoadingScreen } from "../../../components/common";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../../../context/Auth";
import { toast } from "react-toastify";
import { toastMessage } from "../../../helpers/toast-message";
import { setCookie } from "../../../services/cookie.service";

function SignUpScreen() {
  const navigate = useNavigate();
  const { loginUser } = useAuthProvider();

  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const steps = [PersonalInfosStep, AdressStep];

  function backStep(step: number) {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  }

  function addToValues(data: any, submit?: string) {
    setFormValues({ ...formValues, ...data });

    if (submit) {
      submitForm(data);
    }
  }

  async function submitForm(data: any) {
    const user = { ...formValues, ...data };

    if (requesting) {
      toast.warn(toastMessage.REQUESTING);
      return;
    }

    try {
      setRequesting(true);

      const response = await register(user);

      setCookie("token", response.token, 7);

      loginUser();
      toast.success("Cadastro feito com sucesso");

      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(toastMessage.INTERNAL_SERVER_ERROR);
    } finally {
      setRequesting(false);
    }
  }

  return (
    <section className="signup-section">
      <LoadingScreen />

      <div className="hero min-h-screen bg-base-200 py-10">
        <div className="hero-content w-3/4 flex flex-col">
          <div className="text-center">
            <h1 className="text-3xl mb-5 uppercase font-semibold">cadastro</h1>
            <ul className="steps text-slate-700">
              {steps.map((_, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => backStep(i + 1)}
                    className={`step ${
                      currentStep >= i + 1 && "step-primary cursor-pointer"
                    }`}
                  ></li>
                );
              })}
            </ul>
          </div>
          <div className="card shrink-0 w-full md:px-10 max-w-lg shadow-2xl bg-base-100">
            <div className="card-body">
              {steps.map((Step, i) => {
                const lastStep = i + 1 === steps.length;

                return (
                  <div
                    className={`flex-col justify-center ${
                      currentStep !== i + 1 ? "hidden" : "flex"
                    }`}
                    key={i}
                  >
                    {
                      <Step
                        steps={{
                          current: currentStep,
                          setCurrent: setCurrentStep,
                        }}
                        form={{ values: formValues, setValues: addToValues }}
                        submitForm={lastStep && submitForm}
                      />
                    }
                  </div>
                );
              })}
              <span className={`italic text-error text-center bold`}>
                <a
                  href="https://discord.com/invite/FARNSbkZKt"
                  className="link text-blue-500 hover:text-blue-600 underline"
                >
                  suporte
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpScreen;
