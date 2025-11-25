import AdvNavBar from "@/components/AdvNavBar";
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
                <AdvNavBar />
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