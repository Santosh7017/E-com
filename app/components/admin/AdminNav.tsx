"use client";

import React from "react";
import Container from "../Container";
import AdminnavItems from "./AdminnavItems";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-auto flex-nowrap">
          <Link href="/admin">
            <AdminnavItems
              label="Summary"
              Icon={MdDashboard}
              selected={pathname === "/admin"}
            />

          </Link>
          <Link href="/admin/addproducts">
            <AdminnavItems
              label="Add Products"
              Icon={MdLibraryAdd}
              selected={pathname === "/admin/addproducts"}
            />
          </Link>

          <Link href="/admin/manageproducts">
            <AdminnavItems
              label="Manage Products"
              Icon={MdDns}
              selected={pathname === "/admin/manageproducts"}
            />
          </Link>
          <Link href="/admin/manageorders">
            <AdminnavItems
              label="Manage Orders"
              Icon={MdFormatListBulleted}
              selected={pathname === "/admin/manageorders"}
            />
          </Link>


        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
