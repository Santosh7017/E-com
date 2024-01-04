"use client";

import { IconType } from "react-icons";

interface ButtonProp {
  label: string;
  disabled?: boolean;
  small?: boolean;
  outlined?: boolean;
  custom?: string;
  Icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outlined,
  custom,
  Icon,
  small,
  onClick,
}: ButtonProp) => {
  return (
    <button
      disabled={disabled}
      className={`
  disabled:opacity-70 disabled:cursor-not-allowed rounded-md
  hover:opacity-80 transition w-full border-slate-700 flex
  items-center justify-center gap-2 
  ${outlined ? "bg-white" : "bg-slate-700"}
  ${outlined ? "text-slate-700" : "text-white"}
  ${small ? 'text-sm font-light': 'text-md font-semibold'}
  ${small ? 'py-1 px-2 border': 'py-3 px-4 border-2'}
  ${custom ?  custom : ""}
  `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
