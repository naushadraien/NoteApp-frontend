import HomePage from "@/components/Home";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <Suspense fallback={<p>Loading notes...</p>}>
        <HomePage />
      </Suspense>
    </main>
  );
}
