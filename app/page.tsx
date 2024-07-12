import createPost from "@/server/actions/create-post";
import getPosts from "@/server/actions/get-posts";
import { posts } from "@/server/schema";
import Image from "next/image";

// export const dynamic = "force-dynamic"

export default async function Home() {
  const { error, success } = await getPosts();
  if (error) {
    throw new Error(error);
  }
  if (success)
    return (
      <main>
        <h1> Welcome to Next.js</h1>
        {success.map((posts) => (
          <div key={posts.id}>
            <h2>{posts.title}</h2>
          </div>
        ))}
        <form action={createPost}>
          <input
            className="bg-black"
            type="text"
            name="title"
            placeholder="Title"
          />
          <button type="submit">Submit</button>
        </form>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </main>
    );
}
