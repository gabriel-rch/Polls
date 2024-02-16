"use client";

import { useEffect, useState } from "react";
import PollContainer from "@/components/Common/PollContainer";
import PollTitle from "@/components/Poll/PollTitle";

let socket: WebSocket;
const connectSocket = (id: string) => {
  if (!socket) {
    socket = new WebSocket(`ws://localhost:3333/polls/${id}/results`);
  }
};

export default function Page({ params }: { params: { id: string } }) {
  const [poll, setPoll] = useState<Poll | null>(null);

  const totalVotes = poll?.options.reduce(
    (acc, option) => acc + option.votes,
    0,
  );

  connectSocket(params.id);

  poll?.options.forEach((option) => {
    const percentage = (option.votes / totalVotes!) * 100;
    const element = document.getElementById(option.id);
    if (element) {
      element.style.width = `${percentage}%`;
    }
  });

  useEffect(() => {
    fetch(`http://localhost:3333/polls/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPoll(data.poll));
  });

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const option = poll?.options.find(
        (option) => option.id === data.pollOptionId,
      );
      option!.votes = data.votes;
    };
  }, [poll]);

  return (
    <PollContainer>
      <PollTitle>{poll?.title}</PollTitle>
      <div className="flex w-full flex-col gap-4">
        {poll?.options.map((pollOption) => (
          <section key={pollOption.id}>
            <span className=" text-nowrap">{pollOption.title}</span>
            <div className="my-2 flex h-8 w-full font-bold">
              <div
                id={pollOption.id}
                className="flex items-center bg-pink-600 pl-2"
              >
                <span className="ml-2">{`(${((pollOption.votes / totalVotes!) * 100).toFixed()}%)`}</span>
              </div>
            </div>
          </section>
        ))}
      </div>
    </PollContainer>
  );
}
