"use client";

import { useCallback, useState } from "react";
import Avatar from "../products/Avatar";
import { AiFillCaretDown, AiOutlineUserAdd } from "react-icons/ai";
import Link from "next/link";
import MenuItems from "./MenuItems";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { safeUser } from "@/types";
import { BsFillGearFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";

interface currentUserProps {
  currentUser: safeUser | null;
}

const UserMenu: React.FC<currentUserProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-slate-400 flex
    flex-grow items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700
   "
        >
          <Avatar src={currentUser?.image} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div
            className="absolute
    rounded-md
    shadow-md w-[201px]
    bg-white overflow-hidden right-0 top-12 text-sm flex
    flex-col cursor-pointer
    "
          >
            {currentUser ? (
              <div>
                <Link href="/orders">
                <div className="flex items-center  hover:bg-neutral-100 transition">
                <FaShoppingBag className="mr-[0.15rem] ml-[0.5rem]" />
                <MenuItems onclick={toggleOpen}>Your Orders</MenuItems>
                  </div>
                </Link>
                {currentUser.role == "ADMIN" ? (
                  <Link href="/admin">
                    <div className="flex items-center  hover:bg-neutral-100 transition">
                      <BsFillGearFill className="mr-[0.15rem] ml-[0.5rem]" />
                      <MenuItems onclick={toggleOpen}>Admin Dashboard</MenuItems>
                    </div>
                  </Link>
                ) : null}
                <hr />
                <MenuItems
                  onclick={() => {
                    toggleOpen();
                    signOut();
                  }}
                >
                  Logout
                </MenuItems>
              </div>
            ) : (
              <div>
                <Link href="/login">
                <div className="flex items-center  hover:bg-neutral-100 transition">
              <TbLogin2 className="mr-[0.15rem] ml-[0.5rem]" />
                  <MenuItems onclick={toggleOpen}>Login</MenuItems>
                </div>
                </Link>
                <Link href="/register">
                <div className="flex items-center  hover:bg-neutral-100 transition">
              <AiOutlineUserAdd  className="mr-[0.15rem] ml-[0.5rem] text-[15px]"  />
                  <MenuItems onclick={toggleOpen}>Register</MenuItems>
                </div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen ? <BackDrop onclick={toggleOpen} /> : null}
    </>
  );
};

export default UserMenu;
