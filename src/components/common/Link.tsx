import { AnchorHTMLAttributes } from "react";

interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  className?: string;
}

export function Link({ className = "", children, ...props }: ILinkProps) {
  return (
    <a
      {...props}
      rel="noopener noreferrer"
      className={`
        transition-all hover:opacity-80
        ${className}
      `}
    >
      {children}
    </a>
  );
}
