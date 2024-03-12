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
import { noteType } from "@/types";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const NotesByCategory = () => {
  const searchParams = useSearchParams().get("q");

  const note = useSelector((state: RootState) => state.note.notes);
  const data = note?.filter((note) => note.category === searchParams);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 overflow-hidden px-5">
      {data &&
        data.map(
          (note: noteType) =>
            note && (
              <Card key={note._id}>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <div>{note.title}</div>
                    <div>icons come here</div>
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
            )
        )}
    </div>
  );
};

export default NotesByCategory;
