import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  FieldError,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";

interface SelectInputProps<T extends FieldValues> {
  showLabel?: boolean;
  className?: string;
  items: readonly string[];
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  setError: UseFormSetError<T>;
  name: Path<T>;
  // selected: string | undefined;
  inputProps?: InputHTMLAttributes<HTMLSelectElement>
}

export function SelectInput<T extends FieldValues>(props: SelectInputProps<T>) {
  return (
    <div className={`form-control`}>
      <label className={`label ${props.showLabel === false && "hidden"}`}>
        <span className="label-text uppercase">{props.name}</span>
      </label>
      <select
        {...props.register(props.name)}
        {...props.inputProps}
        defaultValue={"Escolha"}
        className={`select ${props.className} ${props.error ? "input-error" : "select-bordered"}`}
      >
        <option className="text-slate-500">UF</option>
        {props.items.map((estado, i) => {
          return <option value={estado} key={i}>{estado}</option>;
        })}
      </select>
      <span className="text-error h-7 w-full text-xs pt-1">
        {props.error?.message}
      </span>
    </div>
  );
}
