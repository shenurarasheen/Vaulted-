"use client"

import { useState } from "react";

const CategoryNav = ({ categories }: { categories: Category[] }) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <nav className="h-10 bg-white py-1 px-10 flex items-center overflow-x-auto hide-scrollbar">
            <ul className="flex gap-2">
                <li className="bg-sky-500/30 rounded-full px-4 border border-sky-300 flex items-center w-fit text-nowrap">
                    <a href="" className="text-[13px]">All</a>
                </li>
                {categories.map((cat, index) => (
                    <li key={index} className="px-4 border border-gray-200 rounded-full flex items-center w-fit text-nowrap">
                        <a href="" className="text-[13px]">{cat.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default CategoryNav;