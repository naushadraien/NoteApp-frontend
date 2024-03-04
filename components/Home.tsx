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
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewNote from "./AddNote";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";

// ... (import statements)

const HomePage = () => {
  const router = useRouter();
  const { isAuth } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["noteData"],
      queryFn: async ({ pageParam = 1 }) => {
        // Destructure pageParam with default 1
        try {
          // Simulate a delay of 1 second
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/notes/user/all?page=${pageParam}`,
            {
              withCredentials: true,
            }
          );
          return data.notes as noteType[];
        } catch (error) {
          console.log(error);
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // Check if there are more pages and increment the page number
        return lastPage?.length ? allPages.length + 1 : undefined;
      },
    });

  // const handleLoadMore = () => {
  //   if (!isFetchingNextPage && hasNextPage) {
  //     fetchNextPage();
  //   }
  // };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      <AddNewNote />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 overflow-hidden px-5">
        {data?.pages.flat().map(
          /*
The flat() method is used to flatten an array of arrays. In the context of pagination with React Query, when you request multiple pages of data, each page's data is typically stored in an array. Therefore, you end up with an array of arrays. The flat() method is used to flatten this structure, so you have a single-level array that contains all the items from all the pages.
          For eg. of flat method
        const pages = [
  [{ id: 1, text: 'Page 1 - Note 1' }, { id: 2, text: 'Page 1 - Note 2' }],
  [{ id: 3, text: 'Page 2 - Note 1' }, { id: 4, text: 'Page 2 - Note 2' }],
];

// Without flat(), you'd get:
// const flattenedWithoutFlat = pages.map((page) => page.map((note) => note.text));
// Result: [['Page 1 - Note 1', 'Page 1 - Note 2'], ['Page 2 - Note 1', 'Page 2 - Note 2']]

// Using flat():
const flattenedWithFlat = pages.flat().map((note) => note.text);
// Result: ['Page 1 - Note 1', 'Page 1 - Note 2', 'Page 2 - Note 1', 'Page 2 - Note 2']
        */
          (
            note // Flatten all pages for rendering
          ) =>
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
        {isLoading && <p>Loading notes...</p>}
        {/* {hasNextPage && (
          <Button onClick={handleLoadMore} disabled={isFetchingNextPage}>
            Load More
          </Button>
        )} */}
        <div className="font-bold text-xl text-red-500 text-center" ref={ref}>
          {isFetchingNextPage && "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
