"use client";
import { RootState } from "@/lib/redux/store/store";
import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const AdminPage = () => {
  const router = useRouter();
  const { data, isAuth } = useSelector((state: RootState) => state.user);
  if (data?.role !== "admin" || !isAuth) {
    router.push("/login");
  }
  // Access the client
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/all`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        return res.data;
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.message);
      }
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/user/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/");
        router.refresh();
      }
      return res.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.message);
    }
  };

  return (
    <div className="flex">
      <div className="flex justify-center items-center mx-10">
        <p>
          {query.data?.length > 0 ? (
            query.data.map((user: UserType) => (
              <div key={user._id} className="flex justify-center items-center">
                <p>{user.name}</p>
                <Button
                  onClick={() => handleDelete(user._id)}
                  className="bg-transparent text-red-500"
                >
                  <Trash />
                </Button>
              </div>
            ))
          ) : (
            <p className="font-bold text-red-500">No User Found!</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default AdminPage;
