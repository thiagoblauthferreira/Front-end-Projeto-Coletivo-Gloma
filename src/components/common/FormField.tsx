import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  setError: UseFormSetError<T>;
  name: Path<T>;
  inputClassName?: string;
  containerClassName?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  return (
    <div className={`form-control ${props.containerClassName}`}>
      <label className="label">
        <span className="label-text uppercase">{props.name}</span>
      </label>

      <input
        {...props.register(props.name)}
        {...props.inputProps}
        className={`input input-bordered ${props.inputClassName} ${
          props.error && "input-error"
        }`}
      />
      <span className="text-error h-1 w-full text-xs pt-1 pb-4">
        {props.error?.message}
      </span>
    </div>
  );
}

export function FormFieldConstructor<T extends FieldValues>() {
  return FormField<T>;
}
