"use client";

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathname = usePathname();

  const isMainpage = pathname === "/";
  if (!isMainpage) return null;
  return (
    <div className="bg-white">
      <Container>
        <div
          className="pt-4 flex flex-row px-5
        items-center justify-between overflow-x-auto sm:gap-6" 
        >
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category == item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
