import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const AllCategoriesforNotes = () => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/notes/cat/all`,
          {
            withCredentials: true,
          }
        );
        return data.categories;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const router = useRouter();
  const handleClick = (cat: string) => {
    // console.log("cat", cat);
    router.replace(`/notes/cat?q=${cat}`);
  };
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Category</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="flex gap-4 p-10 flex-1 w-full">
                {data?.map((cat: string) => (
                  <li key={cat} onClick={() => handleClick(cat)} className="cursor-pointer">
                    {cat}
                  </li>
                ))}
              </ul>
              {/* {data?.map((cat: string) => (
                <NavigationMenuLink
                  key={cat}
                  onClick={() => handleClick(cat)}
                  className="flex gap-10"
                >
                  {cat}
                </NavigationMenuLink>
              ))} */}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AllCategoriesforNotes;
