import Link from "next/link";
import Button from "@/components/Common/Button";
import Footer from "@/components/Common/Footer";

export default function Home() {
  return (
    <section className="flex h-svh flex-col items-center justify-center">
      <main className="flex h-full flex-col items-center justify-center font-bold text-white">
        <span className="text-6xl md:text-7xl">Welcome to </span>
        <span className="text-6xl text-pink-600 md:text-7xl">/ Polls!</span>
        <span className="text-lg md:text-xl">
          Create and track surveys in real-time
        </span>
        <Link href={"/polls"} className="mt-2">
          <Button>Create your Poll here</Button>
        </Link>
      </main>
      <Footer />
    </section>
  );
}
