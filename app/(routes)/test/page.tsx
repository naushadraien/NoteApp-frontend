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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewNote from "@/components/AddNote";
import { Button } from "@/components/ui/button";

// ... (import statements)

const Test = () => {
  const router = useRouter();
  const { isAuth } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  const { data } = useQuery({
    queryKey: ["noteData", currentPage],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/notes/user/all?page=${currentPage}`,
          {
            withCredentials: true,
          }
        );

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleNextPage = () => {
    if (currentPage < data.totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(data.totalPage);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePageNumberClick = (page: number) => {
    setCurrentPage(page);
  };

  const pages = [];
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i < 1) continue;
    if (i > data?.totalPage) break;

    pages.push(i);
  }

  // const songsArray = [1, 2, 3, 5];

  // const foundKey = songsArray.find((key, idx) => songsArray.length === idx + 1); //this finds the last key in the array
  // console.log("found Key", foundKey);

  // console.log("isArray", Array.isArray(songsArray)); //this checks the songsArray is array or not if it is then it will return true

  // console.log(songsArray.length);
  // const kongo = songsArray.map((song, idx) => {
  //   //these both checks the last index of the array and returns true
  //   console.log("last songs index", idx === songsArray.length - 1); //this checks the last index of the array and returns true
  //   console.log("last songs index2", songsArray.length === idx + 1); // this checks the last index of the array and returns true

  //   return <div key={idx}>{song}</div>;
  // });

  // console.log("kongo", kongo);

  return (
    <div>
      <AddNewNote />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 overflow-hidden px-5">
        {data?.notes?.map(
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
      {data?.totalPage && (
        <div className="flex justify-center items-center gap-4">
          <p>
            Page {currentPage} of {data.totalPage}
          </p>
          <Button onClick={handleFirstPage} disabled={currentPage === 1}>
            First Page
          </Button>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageNumberClick(page)}
              disabled={currentPage === page}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={handleNextPage}
            disabled={currentPage === data.totalPage}
          >
            Next
          </Button>
          <Button
            onClick={handleLastPage}
            disabled={currentPage === data.totalPage}
          >
            Last Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default Test;
