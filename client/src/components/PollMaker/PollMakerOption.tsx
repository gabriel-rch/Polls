interface PollMakerOptionProps {
  option: EditablePollOption;
  dispatch: (value: ReducerAction) => void;
}

export default function PollMakerOption(props: PollMakerOptionProps) {
  return (
    <section className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => props.dispatch({ type: "deleted", id: props.option.id })}
        className="h-fit rounded-md border-2 border-white bg-pink-600 px-1 text-sm font-bold transition-colors delay-75"
      >
        X
      </button>
      <input
        placeholder="New Option..."
        spellCheck="false"
        type="text"
        name="option"
        id={props.option.id.toString()}
        onChange={(ev) =>
          props.dispatch({
            type: "updated",
            id: props.option.id,
            value: ev.currentTarget.value,
          })
        }
        className={`w-full text-ellipsis border-2 border-dashed border-transparent border-b-${props.option.valid ? "gray-500" : "red-500"} bg-transparent p-2 font-semibold transition-colors delay-75 focus:outline-none`}
      />
    </section>
  );
}
