import React, { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { getNestedValue } from "../../utils";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: FieldErrors<FieldValues>;
  containerClassName?: string;
  mask?: (value: any) => any;
}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ label, errors, required, containerClassName = "", mask, ...props }, ref) => {
    const error =
      (props.name && errors && getNestedValue(errors, props.name)?.message) || "";

    return (
      <div
        className={`
          flex flex-col gap-1
          ${containerClassName}
        `}
      >
        {label && (
          <label className={`font-bold`} htmlFor={props.id || ""}>
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}

        <input
          {...props}
          ref={ref}
          onChange={(e) => {
            if (mask) {
              e.target.value = mask(e.target.value);
            }
            if (props.onChange) {
              props.onChange(e);
            }
            return e;
          }}
          className={`
            input input-bordered w-full max-w-xs
            rounded-xl h-10 min-w-full
            bg-transparent
            ${props.className}
            ${error && "input-error"}
          `}
        />

        {error && <p className="text-error text-sm text-center">{error as string}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
