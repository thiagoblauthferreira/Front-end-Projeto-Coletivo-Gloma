export {}

/**
 * o registro de veiculos vai passar para o dashboard de usuário
 * então é possível que estas funções sejam uteis um dia
 */

// import { FieldError, useForm } from "react-hook-form";
// import { SelectInput } from "../../../../../components/SelectInput";
// import { Veiculos } from "./utils/Veiculos";
// import {
//   Dispatch,
//   FormEvent,
//   FormEventHandler,
//   SetStateAction,
//   useState,
// } from "react";
// import {
//   VehiclesInterface,
//   VehiclesSchema,
// } from "./utils/vehicles.zod.interface";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { TrashIcon } from "../../../../../utils/icons/trash.icon";
// import { removeItem } from "./utils/removeItem";
// import { FormFieldConstructor } from "../../../../../components/FormField";

// interface VehiclesProps {
//   steps: {
//     setCurrent: Dispatch<SetStateAction<number>>;
//     current: number;
//   };

//   form: {
//     setValues: Dispatch<SetStateAction<any>>;
//     values: any;
//   };
// }

// function VehiclesStep({ steps, form }: VehiclesProps) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<VehiclesInterface>({
//     resolver: zodResolver(VehiclesSchema),
//     mode: "onTouched",
//   });

//   const [veiculosNumber, setVeiculosNumber] = useState<number>(1);
//   const FormField = FormFieldConstructor<VehiclesInterface>();

//   const onSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
//     e.preventDefault();
//     const selectInputs = document.querySelectorAll(
//       ".veiculos-form .veiculo select"
//     ) as NodeListOf<HTMLSelectElement>;
//     const veiculos: string[] = [];

//     selectInputs.forEach((select) => select.value !== "Escolha" && veiculos.push(select.value));

//     /**
//      * Por algum motivo, aqui setValues não registra
//      * os valores atuais junto com o form.values
//      */
//     form.setValues({ ...form.values, veiculos });

//     console.log(form.values)
//   };

//   return (
//     <form
//       className="veiculos-form flex flex-col justify-center"
//       onSubmit={onSubmit}
//     >
//       <h1 className="text-3xl uppercase pb-5 text-center bold">Veículos</h1>
//       <span className="text-center py-5">
//         Você possui algum veículo que pode ser utilizado para ajudar a
//         transportar suprimentos e ferramentas?{" "}
//       </span>
//       {new Array(veiculosNumber).fill(undefined).map((_, i) => (
//         <div key={i} className="veiculo flex flex-col items-center">
//           <div className="flex w-1/2">
//             <select
//               defaultValue={"Escolha"}
//               className={`select select-bordered w-full`}
//             >
//               <option className="text-slate-500">Escolha</option>
//               {Veiculos.map((estado, i) => {
//                 return <option key={i}>{estado}</option>;
//               })}
//             </select>
//             <TrashIcon
//               onClick={removeItem}
//               className={`mt-3 ml-1 hover:text-red-500 cursor-pointer disabled`}
//             />
//           </div>
//           <span className="text-error mb-3 h-5 w-fit text-xs pt-2"></span>
//         </div>
//       ))}
//       <div
//         onClick={() => setVeiculosNumber(veiculosNumber + 1)}
//         className="btn round btn-sm mx-auto mb-5 btn-square btn-outline flex items-center"
//       >
//         <span className="bold text-lg">+</span>
//       </div>
//       <button type="submit" className="mx-auto btn btn-primary w-2/3">
//         Cadastrar
//       </button>
//     </form>
//   );
// }

// export default VehiclesStep;
