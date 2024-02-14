import { redirect } from "next/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  const user = true;
  if (!user) {
    redirect("/login");
  }
  return <div>{children}</div>;
};

export default layout;
