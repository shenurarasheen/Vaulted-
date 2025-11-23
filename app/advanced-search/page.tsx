import AdvProductCardContainer from "@/components/AdvProductCardContainer";
import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PaginationBar from "@/components/Pagination";
import { Checkbox } from "@/components/ui/checkbox";
import products from "@/data/products.json";
import { Search } from "lucide-react";

const AdvancedSearchPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex md:flex-row flex-col px-8 gap-5 flex-1 overflow-hidden">
                <aside className="md:w-[250px] flex flex-col space-y-2 h-full overflow-y-auto">
                    <h1 className="font-semibold mt-4">Advanced Search</h1>
                    <div className="mt-2 space-y-1">
                        <p className="text-[13.5px] font-semibold mb-2">Search Including</p>
                        <div className="flex items-center gap-2">
                            <Checkbox />
                            <label htmlFor="" className="text-[13px]">Title and description</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox />
                            <label htmlFor="" className="text-[13px]">Sold Items</label>
                        </div>
                    </div>

                    <hr className="border border-gray-200 w-full my-3" />

                    <div className="mt-2 space-y-1">
                        <p className="text-[13.5px] font-semibold mb-2">Condition</p>
                        <div className="flex items-center gap-2">
                            <Checkbox />
                            <label htmlFor="" className="text-[13px]">New</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox />
                            <label htmlFor="" className="text-[13px]">Used</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox />
                            <label htmlFor="" className="text-[13px]">Not Specified</label>
                        </div>
                    </div>

                    <hr className="border border-gray-200 w-full my-3" />

                    <div className="mt-2 space-y-1">
                        <p className="text-[13.5px] font-semibold mb-2">Price</p>
                        <div className="flex items-center gap-2">
                            <label htmlFor="" className="text-[13px]">from
                                <input type="text" className="ml-2 border border-gray-300 rounded-sm w-1/3 h-8 px-1 py-0.5 text-[13px]" placeholder="0" />&nbsp;
                                to
                                <input type="text" className="ml-2 border border-gray-300 rounded-sm w-1/3 h-8 px-1 py-0.5 text-[13px]" placeholder="1000" />
                            </label>
                        </div>
                    </div>

                    <hr className="border border-gray-200 w-full my-3" />

                    <div className="mt-2 space-y-1">
                        <p className="text-[13.5px] font-semibold mb-2">Sort By</p>
                        <select name="" id="" className="w-full h-8 border border-gray-300 rounded-lg text-[13px] px-3">
                            <option value="">Select Option</option>
                        </select>
                    </div>

                    <div className="w-full flex justify-end">
                        <Button
                            title="Search"
                            className="w-fit bg-blue-600 mt-4"
                        />
                    </div>

                </aside>
                <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
                    <div className="w-full flex justify-end items-center mt-4 gap-2">
                        <input className="md:w-[300px] w-full h-9 border border-gray-300 rounded-lg text-sm px-3" placeholder="Search here..." />
                        <button className="bg-sky-500 size-9 rounded-lg flex justify-center items-center"><Search size={20} color="white" /></button>
                    </div>
                    <AdvProductCardContainer products={products} />

                    <div className="w-full flex justify-end mt-10">
                        <PaginationBar />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default AdvancedSearchPage;