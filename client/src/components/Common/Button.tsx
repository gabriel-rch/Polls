import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="w-fit self-end rounded-md border-2 border-pink-600 bg-pink-600 px-12 py-1 font-bold transition ease-in hover:border-white active:bg-pink-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
