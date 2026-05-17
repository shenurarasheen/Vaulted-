import clsx from "clsx";
import Link from "next/link";
import React from "react";

const ProfileNavPill = ({ icon, label, href, activeTabIndex, setActiveTab, isActive }: {icon: React.ReactNode, label: string, href: string, activeTabIndex: number, setActiveTab: (tab: number) => void, isActive: boolean}) => {

    const pillStyle = clsx(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-200 font-medium text-sm cursor-pointer",
        {
            "bg-gray-100 text-blue-600": isActive
        }
    );

    const pillTextStyle = clsx(
        "text-[14px]",
        isActive ? "text-blue-600" : "text-gray-700"
    )

    return (
        <li>
            <Link
            href={ href } 
            className={pillStyle}
            onClick={() => {
                setActiveTab(activeTabIndex)
            }}
            >
                <span className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors">
                    { icon }
                </span>
                <span className={pillTextStyle}>{ label }</span>
            </Link>
        </li>
    )
}

export default ProfileNavPill;