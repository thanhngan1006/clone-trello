import React from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  background?: string;
  textColor?: string;
  width?: string;
  height?: string;
  classname?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  children,
  background = "darkBlue",
  textColor = "white",
  width = "24",
  height = "8",
  className = "",
  ...props
}: ButtonProps) => {
  const buttonClasses = classNames(
    `font-bold rounded-md p-2 flex items-center justify-center cursor-pointer hover:bg-blue-500 ${className}`,
    {
      [`bg-${background}`]: background,
      [`text-${textColor}`]: textColor,
      [`w-${width}`]: width,
      [`h-${height}`]: height,
    }
  );

  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
};
