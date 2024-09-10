import { ImgHTMLAttributes } from "react";

interface IImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Image({ ...props }: IImageProps) {
  return (
    <img
      {...props}
      src={
        props.src ||
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      }
    />
  );
}
