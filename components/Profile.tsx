import { userType } from "@/types";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const Profile = ({ data }: { data: userType }) => {
  const router = useRouter();
  const handleUpdate = () => {
    router.push(`/profile/edit`);
  };

  const handleDelete = () => {};
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex gap-x-1 w-4 justify-center items-center">
        <p className="font-bold text-xl">{data.name}</p>
        <Button onClick={handleUpdate} className="bg-transparent text-red-500 ">
          <Edit />
        </Button>
      </div>
      <p>{data.email}</p>
    </div>
  );
};

export default Profile;
