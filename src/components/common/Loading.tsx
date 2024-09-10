interface ILoading {
  className?: string;
}

export function Loading({ className }: ILoading) {
  return (
    <span
      className={`
        text-accent loading loading-infinity loading-lg
        ${className}
      `}
    ></span>
  );
}
