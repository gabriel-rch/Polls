"use client";

import PollContainer from "../Common/PollContainer";
import PollOption from "./PollOption";
import Button from "../Common/Button";
import PollTitle from "./PollTitle";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PollProps {
  poll: Poll;
}

export default function Poll({ poll }: PollProps) {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleVote = () => {
    const element = document.querySelector("input[name=pollOption]:checked");
    if (!element) {
      setError("Select an option to vote!");
      return console.error("No option selected!");
    }

    const optionId = (element as HTMLInputElement).id;

    fetch(`http://localhost:3333/polls/${poll.id}/votes`, {
      method: "POST",
      body: JSON.stringify({
        pollOptionId: optionId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Vote registered successfully!");
          router.push(`/polls/${poll.id}/results`);
        } else {
          console.error("Failed to register vote!");
        }
      })
      .catch((error) => {
        console.error("Failed to register vote!", error);
      });
  };

  return (
    <>
      <PollContainer>
        <PollTitle>{poll.title}</PollTitle>
        {poll.options.map((pollOption) => (
          <PollOption
            id={pollOption.id}
            key={pollOption.id}
            title={pollOption.title}
            votes={pollOption.votes}
          />
        ))}
        <Button onClick={handleVote}>Vote</Button>
      </PollContainer>
      <span className="font-bold text-red-500">{error}</span>
    </>
  );
}
