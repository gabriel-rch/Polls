"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import PollContainer from "../Common/PollContainer";
import OutlineButton from "../Common/OutlineButton";
import Button from "../Common/Button";
import PollMakerTitle from "./PollMakerTitle";
import PollMakerOption from "./PollMakerOption";

const optionsReducer = (
  options: EditablePollOption[],
  action: ReducerAction,
): EditablePollOption[] => {
  switch (action.type) {
    case "added": {
      return [
        ...options,
        {
          id: options.length ? options.at(-1)!.id + 1 : 0,
          title: "",
          valid: false,
        },
      ];
    }
    case "updated": {
      return options.map((option) => {
        if (option.id == action.id!) {
          option.title = action.value!;
          option.valid = option.title != "";
        }
        return option;
      });
    }
    case "deleted": {
      return options.filter((option) => option.id != action.id!);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export default function PollMaker() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [options, dispatch] = useReducer(
    optionsReducer,
    [] as EditablePollOption[],
  );

  const router = useRouter();

  const createPoll = (title: string, options: EditablePollOption[]) => {
    if (title == "") {
      setError("Give your poll a title");
      return console.error("Poll title is empty!");
    }

    if (options.length < 2) {
      setError("Your poll needs two or more options");
      return console.error("Poll must have at least 2 options!");
    }

    if (options.some((option) => option.title == "")) {
      setError("You can't have empty options on your poll");
      return console.error("Some options are empty!");
    }

    setError("");
    console.log("Creating poll with title:", title);
    console.log("Options:", options);

    fetch("http://localhost:3333/polls", {
      method: "POST",
      body: JSON.stringify({
        title,
        options: options.map((option) => option.title),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Poll created successfully!");
          response.json().then((data) => {
            router.push(`/polls/${data.pollId}`);
          });
        } else {
          console.error("Failed to create poll!");
        }
      })
      .catch((error) => {
        console.error("Failed to create poll!", error);
      });
  };

  return (
    <>
      <PollContainer>
        <PollMakerTitle onChange={setTitle} />
        {options.map((option) => (
          <PollMakerOption
            key={option.id}
            option={option}
            dispatch={dispatch}
          />
        ))}
        <span className="my-2"></span>
        <OutlineButton onClick={() => dispatch({ type: "added" })}>
          + Add Option
        </OutlineButton>
      </PollContainer>
      <section className="my-8 flex flex-col items-center gap-8 self-center text-white">
        <span className="font-bold text-red-500">{error}</span>
        <Button onClick={() => createPoll(title, options)}>Create Poll</Button>
      </section>
    </>
  );
}
