import Button from "@/components/Common/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-vw flex h-dvh flex-col items-center justify-center ">
      <span className="select-none text-8xl font-bold text-pink-600 md:text-9xl lg:text-[256px]">
        404
      </span>
      <p className="select-none text-xl font-bold tracking-wider text-white md:text-2xl lg:text-4xl">
        Could not find this poll
      </p>
      <Link
        href="/"
        className="text-md mt-4 text-white hover:cursor-pointer hover:underline md:text-xl lg:text-3xl"
      >
        <Button>Go back Home</Button>
      </Link>
    </div>
  );
}
