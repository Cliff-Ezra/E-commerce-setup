"use client";
import { useFormStatus } from "react-dom";

export default function PostButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-blue-600 py-2 px-4 disabled:opacity-5 rounded-md ml-2"
      type="submit"
    >
      Post
    </button>
  );
}
