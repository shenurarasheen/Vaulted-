"use client";

import AdvNavBar from "@/components/AdvNavBar";
import AdvProductCardContainer from "@/components/AdvProductCardContainer";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PaginationBar from "@/components/Pagination";
import api from "@/lib/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


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


const AdvancedSearchPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[] | []>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProductsByTerm = filteredProducts.filter((product) => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
            product.title.toLowerCase().includes(lowerCaseTerm) ||
            product.description.toLowerCase().includes(lowerCaseTerm) ||
            product.category.toLowerCase().includes(lowerCaseTerm)
        );
    })

    const handleSearch = async (searchData: SearchData | []) => {
        setIsLoading(true);
        try {
            const res = await api.post("products/get-filtered-products", searchData, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                setFilteredProducts(data.data as ProductProps[] | []);
                console.log("Filtered Products:", data.data);
            } else {
                toast.error(data.message || "Failed to fetch products.");
            }
        } catch (error) {
            // API interceptor handles errors, so no need to handle them here
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleSearch(createInitialFilterState());

    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex md:flex-row flex-col px-5 gap-5 flex-1 overflow-hidden">

                <AdvNavBar handleFilterChange={(searchData: SearchData) => handleSearch(searchData)} isLoading={isLoading} />
                    
                <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
                    <div className="w-full flex justify-end items-center mt-4 gap-2">
                        
                        <input 
                            className="md:w-[350px] w-full h-9 border border-gray-300 rounded-lg text-sm px-3" 
                            placeholder="Search here..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* <button className="bg-sky-500 size-9 rounded-lg flex justify-center items-center"><Search size={20} color="white" /></button> */}
                    </div>
                    <AdvProductCardContainer products={filteredProductsByTerm} />

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