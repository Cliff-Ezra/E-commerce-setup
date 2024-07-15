import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main>
      <h1>HomePage</h1>
      <Button className="ml-2" variant={"default"}>Click me</Button>
    </main>
  );
}
