import { ReactNode } from "react";

interface PollTItleProps {
  children: ReactNode;
}

export default function PollTitle(props: PollTItleProps) {
  return (
    <span className="break-all border-b-2 border-dashed border-gray-600 py-2 font-semibold">
      {props.children}
    </span>
  );
}
