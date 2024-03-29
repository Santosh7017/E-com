import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartProductCount from "./CartProductCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";


const redressed = Redressed({subsets: ['latin'], weight: ['400'] })
const Navbar = async () => {
  
  const currentuser = await getCurrentUser();
  
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-50 shadow-sm ">
      <div className="py-4 border-b-[1px] px-5">
          <Container >
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Link href='/' className={`${redressed.className} font-bold text-2xl`}>
                Digi-Shop
              </Link>
               <div className=" md:block"><SearchBar /></div>
               <div className="flex items-center gap-8 md:gap-12 ">
                <CartProductCount/>
                <UserMenu currentUser = {currentuser} />
               </div>
            </div>
            </Container >
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
