"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchFilters {
    // Search options
    searchOptions: {
        titleDesc: boolean;
        completedListings: boolean;
        soldItems: boolean;
    };
    // Categories
    categories: {
        electronics: boolean;
        apparel: boolean;
        homeLiving: boolean;
        beauty: boolean;
        sportsOutdoor: boolean;
    };
    // Price range
    minPrice: number;
    maxPrice: number;
    // Seller
    sellerType: string;
    authorizedSeller: boolean;
    // Delivery and returns
    deliveryOptions: {
        freeShipping: boolean;
        returnAccepted: boolean;
    };
    // Listing options
    listedIn: string;
    // Sort by
    sortBy: string;
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="px-4 py-3 flex flex-col gap-2.5">
        <p className="text-[14px] font-semibold text-gray-800">{title}</p>
        {children}
    </div>
);

const CheckRow = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group">
        {/* <Checkbox
            checked={checked}
            onCheckedChange={onChange}
            className="mt-0.5"
        /> */}
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e)}
            className="w-4 h-4 accent-blue-600 shrink-0 cursor-pointer rounded"
        />
        <span className="text-[13.5px] text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
            {label}
        </span>
    </label>
);

const createInitialFilters = () => ({
    // Search options
    searchOptions: {
        titleDesc: false,
        completedListings: false,
        soldItems: false,
    },
    // Categories
    categories: {
        electronics: false,
        apparel: false,
        homeLiving: false,
        beauty: false,
        sportsOutdoor: false,
    },
    // Price range
    minPrice: 0,
    maxPrice: 0,
    // Seller
    sellerType: "",
    authorizedSeller: false,
    // Delivery and returns
    deliveryOptions: {
        freeShipping: false,
        returnAccepted: false,
    },
    //Listing options
    listedIn: "",
    // Sort by
    sortBy: "",
});

const createInitialFilterState = () => ({
    searchOptions: [],
    categories: [],
    minPrice: 0,
    maxPrice: 0,
    sellerType: "",
    authorizedSeller: false,
    deliveryOptions: [],
    listedIn: "",
    sortBy: ""
});

const AdvNavBar = ({handleFilterChange, isLoading}: {handleFilterChange: (searchData: SearchData) => Promise<void>; isLoading: boolean}) => {
    const [filters, setFilters] = useState<SearchFilters>(() => createInitialFilters());
    const [searchFilterState, setSearchFilterState] = useState<SearchData>(() => createInitialFilterState());

    const toggle = <
        K extends "searchOptions" | "categories" | "deliveryOptions",
        P extends keyof SearchFilters[K]
    >(group: K, key: P) => {

        setFilters((prev) => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: !prev[group][key]
            }
        }));

        setSearchFilterState((prev) => {
            const groupArray = prev[group] as string[];
            const keyString = key as string;
            const updatedGroupArray = groupArray.includes(keyString)
                ? groupArray.filter((item) => item !== keyString)
                : [...groupArray, keyString];
            return {
                ...prev,
                [group]: updatedGroupArray
            };
        });

    }

    const toggleSingle = (key: keyof SearchFilters) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
        setSearchFilterState((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    }

    const set = (key: keyof SearchFilters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setSearchFilterState((prev) => ({ ...prev, [key]: value }));
    }

    console.log("Filtered State: ", searchFilterState);

    const inputCls = "w-full px-2.5 py-1.5 text-[13.5px] border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-100 outline-none transition-all text-gray-700 placeholder-gray-300";
    void inputCls;
    const selectCls = "w-full px-2.5 py-1.5 text-[13.5px] border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-300 outline-none transition-all text-gray-700";

    return (
        <aside className="w-[300px] flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

            <p className="text-[10.5px] font-semibold uppercase tracking-widest text-gray-400 mb-3 mt-4 px-1">
                Advanced search
            </p>

            <div className="bg-white border border-gray-100 rounded-xl flex flex-col divide-y divide-gray-100">

                <Section title="Search options">
                    <CheckRow label="Title and description" checked={filters.searchOptions.titleDesc} onChange={() => toggle("searchOptions", "titleDesc")} />
                    <CheckRow label="Completed listings" checked={filters.searchOptions.completedListings} onChange={() => toggle("searchOptions", "completedListings")} />
                    <CheckRow label="Sold items only" checked={filters.searchOptions.soldItems} onChange={() => toggle("searchOptions", "soldItems")} />
                </Section>

                <Section title="Category">
                    <CheckRow label="Electronics" checked={filters.categories.electronics} onChange={() => toggle("categories", "electronics")} />
                    <CheckRow label="Apparel" checked={filters.categories.apparel} onChange={() => toggle("categories", "apparel")} />
                    <CheckRow label="Home & Living" checked={filters.categories.homeLiving} onChange={() => toggle("categories", "homeLiving")} />
                    <CheckRow label="Beauty" checked={filters.categories.beauty} onChange={() => toggle("categories", "beauty")} />
                    <CheckRow label="Sports & Outdoor" checked={filters.categories.sportsOutdoor} onChange={() => toggle("categories", "sportsOutdoor")} />
                </Section>

                <Section title="Price range">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                        <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-gray-400 pointer-events-none">$</span>
                            <input
                                type="text"
                                value={filters.minPrice}
                                onChange={(e) => set("minPrice", e.target.value)}
                                placeholder="Min"
                                className="w-full pl-6 pr-2 py-1.5 text-[13.5px] border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-100 outline-none transition-all placeholder-gray-300"
                            />
                        </div>
                        <span className="text-[12px] text-gray-400 text-center">–</span>
                        <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-gray-400 pointer-events-none">$</span>
                            <input
                                type="text"
                                value={filters.maxPrice}
                                onChange={(e) => set("maxPrice", e.target.value)}
                                placeholder="Max"
                                className="w-full pl-6 pr-2 py-1.5 text-[13.5px] border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring-1 focus:ring-blue-100 outline-none transition-all placeholder-gray-300"
                            />
                        </div>
                    </div>
                </Section>


                <Section title="Seller">
                    <select value={filters.sellerType} onChange={(e) => set("sellerType", e.target.value)} className={selectCls}>
                        <option value="">All sellers</option>
                        <option value="private">Private sellers</option>
                        <option value="business">Business sellers</option>
                        <option value="toprated">Top rated sellers</option>
                    </select>
                    <CheckRow label="Authorized sellers only" checked={filters.authorizedSeller} onChange={() => toggleSingle("authorizedSeller")} />
                </Section>

                <Section title="Delivery and returns">
                    <CheckRow label="Free shipping" checked={filters.deliveryOptions.freeShipping} onChange={() => toggle("deliveryOptions", "freeShipping")} />
                    <CheckRow label="Returns accepted" checked={filters.deliveryOptions.returnAccepted} onChange={() => toggle("deliveryOptions", "returnAccepted")} />
                </Section>

                <Section title="Listing options">
                    <div>
                        <p className="text-[12px] text-gray-400 mb-1.5">Listed in</p>
                        <select value={filters.listedIn} onChange={(e) => set("listedIn", e.target.value)} className={selectCls}>
                            <option value="">Any time</option>
                            <option value="24h">Last 24 hours</option>
                            <option value="3d">Last 3 days</option>
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                        </select>
                    </div>
                </Section>

                <Section title="Sort by">
                    <select value={filters.sortBy} onChange={(e) => set("sortBy", e.target.value)} className={selectCls}>
                        <option value="">Best match</option>
                        <option value="price_asc">Price: low to high</option>
                        <option value="price_desc">Price: high to low</option>
                        <option value="newest">Newly listed</option>
                        <option value="ending">Ending soonest</option>
                        <option value="distance">Nearest first</option>
                        <option value="feedback">Highest feedback</option>
                    </select>
                </Section>

            </div>

            <div className="flex gap-2 mt-3 px-0.5">
                <button
                    className="flex-1 py-2 rounded-xl border border-gray-200 text-[13px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:scale-[0.98] transition-all"
                onClick={() => {
                    setSearchFilterState(() => createInitialFilterState());
                    setFilters(() => createInitialFilters());
                    handleFilterChange(createInitialFilterState());
                }}
                >
                    Reset
                </button>
                <button
                    className="flex-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all"
                    onClick={() => handleFilterChange(searchFilterState)}
                >
                    <Search className="w-4 h-4" />
                    Search
                </button>
            </div>

        </aside>
    );
};

export default AdvNavBar;