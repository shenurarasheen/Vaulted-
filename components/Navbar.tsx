"use client";

import { Globe, ShoppingCart, User } from "lucide-react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import CategoryNav from "./CategoryNav";
import categories from "@/data/categories.json";
import HomeCarousel from "./HomeCarousel";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <section className="sticky top-0 w-full z-50">
            <HomeCarousel
                height="25px"
                areButtonsShown={false}
                itemContent={[
                    <div className="w-full h-full bg-sky-100 flex justify-center items-center">
                        <p className="text-sm">Item content 1</p>
                    </div>,
                    <div className="w-full h-full bg-sky-100 flex justify-center items-center">
                        <p className="text-sm">Item content 2</p>
                    </div>,
                ]}
                className="w-full bg-sky-100 z-0"
            />
            <nav className="navbar">
                <div className="flex w-full items-center">
                    <Image
                        src="/logo.png"
                        alt="logo image"
                        width={140}
                        height={40}
                    />
                    <SearchInput />
                    <div className="flex xl:gap-8 gap-4 items-center">
                        <button><Globe size={22} /></button>
                        <button><ShoppingCart size={22} /></button>
                        <button><User size={22} /></button>
                        <Button
                            title="Create Account"
                            url="/sign-up"
                            className="bg-sky-500 hover:bg-sky-500/80"
                        />
                    </div>
                </div>
            </nav>
            {pathname === "/" && (
                <CategoryNav categories={categories} />
            )}
        </section>
    )
}

export default Navbar;