"use client";

import { Globe, ShoppingCart, User } from "lucide-react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import CategoryNav from "./CategoryNav";
import categories from "@/data/categories.json";
import HomeCarousel from "./HomeCarousel";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <section className="sticky top-0 w-full z-50">
            <HomeCarousel
                height="25px"
                areButtonsShown={false}
                itemContent={[
                    <div key="item1" className="w-full h-full bg-sky-100 flex justify-center items-center">
                        <p className="text-sm">Item content 1</p>
                    </div>,
                    <div key="item2" className="w-full h-full bg-sky-100 flex justify-center items-center">
                        <p className="text-sm">Item content 2</p>
                    </div>,
                ]}
                className="w-full bg-sky-100 z-0"
            />
            <nav className="navbar">
                <div className="flex w-full items-center">
                    <div onClick={() => router.push("/")}>
                        <Image
                            src="/logo.png"
                            alt="logo image"
                            width={140}
                            height={40}
                        />
                    </div>
                    <SearchInput />
                    <div className="flex xl:gap-8 gap-4 items-center">
                        <button><Globe size={22} /></button>
                        <Link href="/cart"><ShoppingCart size={22} /></Link>
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