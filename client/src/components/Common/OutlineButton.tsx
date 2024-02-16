import { ReactNode } from "react";

interface OutlineButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function OutlineButton(props: OutlineButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className="w-fit justify-self-end rounded-md border-2 border-pink-500 bg-transparent px-6 py-1 font-bold text-pink-500 transition ease-in hover:border-pink-400 hover:text-pink-400"
    >
      {props.children}
    </button>
  );
}
