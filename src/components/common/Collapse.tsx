import React from "react";
import { BsChevronDown } from "react-icons/bs";

interface ICollapseProps {
  children: React.ReactNode;
  btnCollapseChildren: React.ReactNode;
  defaultIsOpen?: boolean;
  className?: string;
  buttonArrow?: {
    removeButton?: boolean;
    className?: string;
  };
}

export function Collapse({
  btnCollapseChildren,
  children,
  className = "",
  buttonArrow,
  defaultIsOpen = false,
}: ICollapseProps) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const clonedBtnCollapse = React.cloneElement(
    btnCollapseChildren as React.ReactElement,
    { onClick: handleClick }
  );

  return (
    <div className={`${className}`}>
      <div className={`cursor-pointer relative`}>
        {clonedBtnCollapse}

        {!buttonArrow?.removeButton && (
          <BsChevronDown
            size={16}
            className={`
              absolute right-0 mr-3 top-1/2 
              -translate-y-1/2 transition-all
              ${isOpen ? "-rotate-90" : "rotate-0"}
              ${buttonArrow?.className}
            `}
            onClick={handleClick}
          />
        )}
      </div>

      <div
        className={`
          overflow-hidden transition-all ease-in-out duration-500
          ${isOpen ? "max-h-[9999px]" : "max-h-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
