import Poll from "@/components/Poll/Poll";
import { notFound } from "next/navigation";

async function getPollData(id: string): Promise<{ poll: Poll }> {
  const response = await fetch(`http://localhost:3333/polls/${id}`);
  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getPollData(params.id);

  return <Poll poll={data.poll} />;
}
