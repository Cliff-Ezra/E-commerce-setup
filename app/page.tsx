import { cookies } from "next/headers";
import Image from "next/image";

// export const dynamic = "force-dynamic"

export default async function Home() {
  // throw new Error("This is a test error");
  cookies();
  return (
    <main>
      <h1> Welcome to Next.js</h1>
      <div>{Date.now()}</div>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </main>
  );
}
