interface PollMakerTitleProps {
  onChange: (title: string) => void;
}

export default function PollMakerTitle(props: PollMakerTitleProps) {
  return (
    <textarea
      placeholder="Give your poll a title..."
      spellCheck="false"
      name="input-title"
      id="title"
      rows={2}
      onChange={(ev) => props.onChange(ev.currentTarget.value)}
      className="resize-none border-2 border-dashed border-transparent border-b-gray-500 bg-transparent p-4 font-bold transition-colors delay-75 focus:border-gray-500 focus:outline-none"
    ></textarea>
  );
}
