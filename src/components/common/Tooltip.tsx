interface ITooltipProps {
  children: React.ReactNode;
  className?: string;
  text: React.ReactNode;
  position?:
    | "tooltip-right"
    | "tooltip-left"
    | "tooltip-bottom"
    | "tooltip-top"
    | "tooltip-open";
}

export function Tooltip({
  children,
  text,
  className,
  position = "tooltip-top",
}: ITooltipProps) {
  return (
    <div
      className={`
        tooltip
        ${position}
        ${className}
      `}
      data-tip={text}
    >
      {children}
    </div>
  );
}
