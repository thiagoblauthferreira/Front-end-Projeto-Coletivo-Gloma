import React, { TextareaHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { getNestedValue } from "../../utils";

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errors?: any;
  register?: UseFormRegister<FieldValues>;
  containerClassName?: string;
  mask?: (value: any) => any;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
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

        <textarea
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
            rounded-xl min-h-10 min-w-full 
            bg-transparent
            ${props.className}
            ${error && "input-error"}
          `}
        />

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
