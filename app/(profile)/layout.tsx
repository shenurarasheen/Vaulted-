"use client";

import Navbar from "@/components/Navbar";
import ProfileNavBottom from "@/components/ProfileNavBottom";
import ProfileNavPill from "@/components/ProfileNavPill";
import { CreditCard, ShoppingCart, Store, UserRound } from "lucide-react";
import React, { useState } from "react";

type AppLayoutProps = Readonly<{ children: React.ReactNode }>

type TabData = {
    icon: React.ReactNode;
    label: string;
    href: string;
}

const ProfileLayout = ({ children }: AppLayoutProps) => {

    const [activeTab, setActiveTab] = useState<number>(0);

    const tabData: TabData[] = [
        { icon: <UserRound size={22} />, label: "Profile", href: "/profile" },
        { icon: <ShoppingCart size={22} />, label: "Orders", href: "/orders" },
        { icon: <CreditCard size={22} />, label: "Payment Details", href: "/payment-details" },
        { icon: <Store size={22} />, label: "Sell", href: "/sell" },
    ];

    return (
        <main className="min-w-full">
            <Navbar />

            <div className="h-screen w-60 bg-white border-r border-gray-200 fixed p-3 shadow-sm">
                <ul className="w-full space-y-1">

                    {
                        tabData.map((data, index) => (
                            <ProfileNavPill
                                key={index}
                                icon={data.icon}
                                label={data.label}
                                href={data.href}
                                activeTabIndex={index}
                                setActiveTab={setActiveTab}
                                isActive={index === activeTab}
                            />
                        ))
                    }


                </ul>

                <ProfileNavBottom />
            </div>

            <div className="flex-1 ml-60">
                {children}
            </div>
        </main>
    )
}

export default ProfileLayout;