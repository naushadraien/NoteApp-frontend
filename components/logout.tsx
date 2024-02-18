import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { addUser, logoutUser } from "@/lib/redux/slices/userSlice";
import toast from "react-hot-toast";
const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`,
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);
      dispatch(logoutUser());
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      <LogOut />
    </Button>
  );
};

export default Logout;
