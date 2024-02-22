"use client";
import { RootState } from "@/lib/redux/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const router = useRouter();
  // const { data, isAuth, user } = useSelector((state: RootState) => state.user);
  const { data, isAuth, } = useSelector((state: RootState) => state.user);
  // console.log(user);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  return <div>Hello {data?.name}</div>;
};

export default HomePage;
