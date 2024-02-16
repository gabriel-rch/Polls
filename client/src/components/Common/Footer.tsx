import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-4 mt-auto self-center">
      <span className="text-gray-700">Made by </span>
      <Link
        href="https://www.github.com/gabriel-rch"
        target="_blank"
        className="text-md text-gray-700 transition-colors hover:text-gray-600 hover:underline"
      >
        Gabriel
      </Link>
    </footer>
  );
}
