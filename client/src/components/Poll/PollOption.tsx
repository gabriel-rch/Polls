"use client";

interface PollOptionProps {
  id: string;
  title: string;
  votes?: number;
}

export default function PollOption({ id, title, votes }: PollOptionProps) {
  return (
    <div
      className="flex cursor-pointer items-center gap-4 break-all"
      onClick={() => {
        (document.getElementById(id) as HTMLInputElement).checked = true;
      }}
    >
      <input
        type="radio"
        name="pollOption"
        id={id}
        className="inline size-4 cursor-pointer accent-pink-600"
      />
      <span className="text-wrap font-semibold">{title}</span>
    </div>
  );
}
