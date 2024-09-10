interface IAvatarProps {
  src: string;
  className?: string;
}

export function Avatar({ src, className }: IAvatarProps) {
  return (
    <div className="avatar">
      <div
        className={`
          size-8 rounded-full 
          ${className}
        `}
      >
        <img
          src={
            src ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
        />
      </div>
    </div>
  );
}
