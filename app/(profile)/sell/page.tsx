'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, TrendingUp, Package, DollarSign, LoaderCircle } from 'lucide-react';
import SellerStatusCard from '@/components/SellerStatusCard';
import SellerProductRow from '@/components/SellerProductRow';
import AddProductPopup from '@/components/AddProduct';
import ProductDetailPopup from '@/components/ProductDetailsPopup';
import toast from 'react-hot-toast';
import api from '@/lib/api';

const SellPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isAddProductPopupOpen, setIsAddProductPopupOpen] = useState(false);
    const [sellerProducts, setSellerProducts] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);

    const filteredProducts = sellerProducts.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === 'all' || product.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalRevenue = filteredProducts.reduce(
        (sum, product) => sum + product.basePrice * product.soldCount,
        0
    );
    const totalSold = filteredProducts.reduce(
        (sum, product) => sum + product.soldCount,
        0
    );

    //Load seller products
    useEffect(() => {
        const fetchSellerProducts = async () => {
            setIsLoading(true);
            try {
                const res = await api.get("/products/get-seller-products", { withCredentials: true });
                const data = res.data;
                if (data.success) {
                    const sellerProducts = data.data as ProductProps[];

                    console.log("Fetched seller products:", sellerProducts);
                    
                    setSellerProducts(sellerProducts);

                } else {
                    toast.error(data.message || "Failed to fetch selling products");
                }
            } catch {
                // API interceptor handles response errors.
            } finally {
                setIsLoading(false);
            }
        }
        fetchSellerProducts();
    }, []);

    // Add product handler function
    const handleAddProduct = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const res = await api.post("/products/add", formData, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                const newProduct = data.data as ProductProps;
                toast.success(data.message || "Product added successfully!");

                setSellerProducts(prevProducts => [...prevProducts, newProduct]);

                setIsAddProductPopupOpen(false);

            } else {
                toast.error(data.message || "Failed to add product. Please try again later.");
            }
        } catch {
            // API interceptor handles response errors. don't need to handle it here
        } finally {
            setIsLoading(false);
        }
    }


    // Update product handler function
    const handleUpdateProduct = async (formData: FormData, productId?: string) => {
        if (!productId) {
            toast.error("Missing product ID for update.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.put(`/products/update/${productId}`, formData, { withCredentials: true });
            const data = res.data;
            if (data.success) {
                const updatedProduct = data.data as ProductProps;

                setSellerProducts(prevProducts => prevProducts.map(product => (
                    product._id === updatedProduct._id ? updatedProduct : product
                )));

                setIsAddProductPopupOpen(false);
                
                setSelectedProduct(null);

                toast.success(data.message || "Product updated successfully!");
            } else {
                toast.error(data.message || "Failed to update product. Please try again later.");
            }
        } catch {
            // API interceptor handles response errors. don't need to handle it here
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            My Products
                        </h1>
                        <p className="text-slate-600 mt-2">
                            Manage and track your selling products
                        </p>
                    </div>
                    <button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                        onClick={() => setIsAddProductPopupOpen(true)}
                    >
                        <Plus size={20} />
                        Add New Product
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <SellerStatusCard
                        title="Total Products"
                        count={filteredProducts.length}
                        icon={<Package className="text-blue-600" size={24} />}
                        iconBg='bg-blue-100'
                    />

                    <SellerStatusCard
                        title="Total Sold"
                        count={totalSold}
                        icon={<TrendingUp className="text-green-600" size={24} />}
                        iconBg='bg-green-100'
                    />

                    <SellerStatusCard
                        title="Total Revenue"
                        count={totalRevenue.toFixed(2)}
                        icon={<DollarSign className="text-purple-600" size={24} />}
                        iconBg='bg-purple-100'
                    />

                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-slate-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="text"
                            placeholder="Search products by name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            {filteredProducts.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-80">
                                        Product
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-28">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-24">
                                        Sold
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-24">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-40">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-32">
                                        Date Added
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 w-32">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center">
                                            <div className="inline-flex items-center justify-center">
                                                <LoaderCircle size={32} className="animate-spin text-blue-600" />
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                    filteredProducts.map((product) => (
                                        <SellerProductRow
                                            key={product._id}
                                            product={product}
                                            onView={(selectedProduct) => setSelectedProduct(selectedProduct)}
                                            openEditPopup={(isEditing: boolean) => setIsAddProductPopupOpen(isEditing)}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                        <Search size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        No products found
                    </h3>
                    <p className="text-slate-600 mb-6">
                        {searchTerm || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter criteria'
                            : 'Start by adding your first product'}
                    </p>
                    <button
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        onClick={() => setIsAddProductPopupOpen(true)}>
                        <Plus size={20} />
                        Add Your First Product
                    </button>
                </div>
            )}

            {isAddProductPopupOpen && (
                <AddProductPopup
                    key={selectedProduct?._id ?? "new"}
                    isOpen={isAddProductPopupOpen}
                    onClose={() => {setIsAddProductPopupOpen(false); setSelectedProduct(null)}}
                    onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
                    initialData={selectedProduct ? selectedProduct : null}
                    isLoading={isLoading}
                />
            )}

            {(selectedProduct && !isAddProductPopupOpen) && (
                <ProductDetailPopup
                    product={selectedProduct}
                    isOpen={selectedProduct !== null}
                    onClose={() => setSelectedProduct(null)}
                    onDelete={() => { }}
                />
            )}
        </div>
    );
};

export default SellPage;