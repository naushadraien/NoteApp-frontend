"use client";

import BreadCrumb from "@/components/BreadCrumb";
import Profile from "@/components/Profile";
import { RootState } from "@/lib/redux/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SingleProfile = () => {
  const router = useRouter();
  const { data, isAuth } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);
  const breadCrumbs = [{ label: "Profile", path: "/profile" }];
  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumbs} />
      {data && <Profile data={data} />}
    </>
  );
};

export default SingleProfile;
