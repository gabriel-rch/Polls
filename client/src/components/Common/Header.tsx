import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-6 flex justify-center py-8 text-6xl font-bold tracking-wide text-pink-600">
      <Link href="/">Polls</Link>
    </header>
  );
}
