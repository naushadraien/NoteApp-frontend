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
import { Button } from "./ui/button";
// ... (import statements)

const Notes = () => {
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
  const handleLastPage = () => {
    setCurrentPage(data.totalPage);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  //   const pageSize = 3;

  const renderPageButtons = () => {
    const buttons = [];
    // const startPage = Math.max(1, currentPage - Math.floor(pageSize / 2)); //Math.max to ensure startPage is not less than 1 and Math.floor to round down eg. const maxNumber = Math.max(5, 10, 3, 8); // Returns 10

    // const endPage = Math.min(data.totalPage, startPage + pageSize - 1); //Math.min to ensure endPage is not greater than totalPage and Math.floor to round down eg. const minNumber = Math.min(5, 10, 3, 8); // Returns 3
    // for (let i = startPage; i <= endPage; i++) {
    for (let i = 1; i <= data.totalPage; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={currentPage === i}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };
  return (
    <div>
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
          {renderPageButtons()}
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

export default Notes;
