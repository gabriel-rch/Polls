import { ReactNode } from "react";

import Header from "@/components/Common/Header";

interface PollsLayoutProps {
  children: ReactNode;
}

export default function PollsLayout(props: PollsLayoutProps) {
  return (
    <main className="h-vh w-vw flex flex-col items-center p-8">
      <Header />
      {props.children}
    </main>
  );
}
