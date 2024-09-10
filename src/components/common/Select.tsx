import React, { SelectHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { getNestedValue } from "../../utils";

export interface IOption {
  label: string;
  value: string;
  disabeld?: boolean;
  selected?: boolean;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  label?: string;
  errors?: any;
  register?: UseFormRegister<FieldValues>;
}

const Select = React.forwardRef<HTMLSelectElement, ISelectProps>(
  ({ label, options, errors, required, ...props }, ref) => {
    const error =
      (props.name && errors && getNestedValue(errors, props.name)?.message) || "";

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className={`font-bold`} htmlFor={props.id || ""}>
            {label}
            {required && <span className="text-error"> *</span>}
          </label>
        )}

        <select
          {...props}
          ref={ref}
          className={`
            select select-bordered w-full max-w-xs
            rounded-xl min-h-max h-10 min-w-full
            bg-transparent
            ${props.className}
            ${error && "input-error"}
          `}
        >
          {options.map((option, index) => {
            return (
              <option
                key={`option-${option.value}-${index}`}
                disabled={option.disabeld}
                selected={option.selected}
                value={option.value}
              >
                {option.label}
              </option>
            );
          })}
        </select>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
