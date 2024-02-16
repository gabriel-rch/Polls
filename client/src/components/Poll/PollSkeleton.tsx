import PollContainer from "../Common/PollContainer";

export default function PollSkeleton() {
  return (
    <PollContainer>
      <span className="m-4 border-b-2 border-dashed border-gray-600 pb-2 text-lg font-semibold sm:text-xl">
        Loading...
      </span>
    </PollContainer>
  );
}
