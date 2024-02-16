import { ReactNode } from "react";

interface PollContainerProps {
  children?: ReactNode;
}

export default function PollContainer(props: PollContainerProps) {
  return (
    <div className="text-md flex h-fit w-full min-w-52 flex-col gap-6 rounded-xl bg-slate-800 p-8 text-white shadow-md sm:w-[36rem] sm:text-lg lg:text-xl">
      {props.children}
    </div>
  );
}
