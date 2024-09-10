interface IAlertProps {
  children: React.ReactNode;
  className?: string;
  type?: "alert-info" | "alert-success" | "alert-warning" | "alert-error";
  icon?: React.ReactNode;
}

export function Alert({ children, icon, className, type = "alert-info" }: IAlertProps) {
  return (
    <div
      role="alert"
      className={`
        alert ${type} rounded-lg 
        ${className}
      `}
    >
      {icon}
      {children}
    </div>
  );
}
