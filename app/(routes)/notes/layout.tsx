"use client";
import AllCategoriesforNotes from "@/components/AllCategoriesforNotes";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4">
      <AllCategoriesforNotes />
      {children}
    </div>
  );
};

export default layout;
