import { Camera, Search } from "lucide-react";
import Select from "./Select";

const SearchInput = () => {
    return (
        <div className="flex flex-1 mx-15 justify-between border-[1.4px] border-gray-300 rounded-full gap-2 overflow-hidden">
            <div className=" bg-gray-200 w-15 flex items-center justify-center">
                <Select />
            </div>
            <input
                type="text"
                className="ml-1 flex-1 m-1 placeholder:text-sm"
                placeholder="Search products here..."
            />
            <div className="flex items-center gap-3 m-1">
                <Camera size={22} color="gray" />
                <button className="bg-sky-500 rounded-full p-1 h-8">
                    <span className="flex items-center gap-2 text-sm text-white px-3 font-semibold"><Search size={15} />Search</span>
                </button>
            </div>
        </div>
    )
}

export default SearchInput;