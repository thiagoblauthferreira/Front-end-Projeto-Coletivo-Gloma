import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "prefix"> {
  text: React.ReactNode;
  loading?: boolean;
  prefix?: React.ReactNode;
  sufix?: React.ReactNode;
}

export function Button({
  className,
  loading,
  text,
  prefix,
  sufix,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      className={`
        btn btn-active !min-h-max h-10 rounded-xl
        ${className}
      `}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {prefix && prefix}
      {text}
      {sufix && sufix}
    </button>
  );
}
