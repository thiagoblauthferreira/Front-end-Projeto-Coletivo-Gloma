interface ISkeletonProps {
  className: string;
}

export function Skeleton({ className }: ISkeletonProps) {
  return <div className={`skeleton ${className}`}></div>;
}
