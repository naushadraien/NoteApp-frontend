"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState } from "@/lib/redux/store/store";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const searchParams = useSearchParams().get("q");
  const notes = useSelector((state: RootState) => state.note.notes);
  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(searchParams!.toLowerCase())
  );
  return (
    <div className="flex justify-center items-center gap-10 flex-wrap ">
      <Suspense
        fallback={<div className="text-red-500 font-bold">Loading...</div>}
      >
        {filteredNotes?.length === 0 ? (
          <p className="text-red-500 font-bold">No Notes found!</p>
        ) : (
          filteredNotes?.map((note) => (
            <Card key={note._id}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <div>{note.title}</div>
                </CardTitle>
                <CardDescription>{note.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{note.category}</p>
              </CardContent>
              <CardFooter>
                <p>{new Date(note.createdAt).toLocaleString()}</p>
              </CardFooter>
            </Card>
          ))
        )}
      </Suspense>
    </div>
  );
};

export default SearchPage;
