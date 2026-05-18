'use client';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, TrendingUp, Package, DollarSign } from 'lucide-react';
import SellerStatusCard from '@/components/SellerStatusCard';

interface SellerProduct {
    id: string;
    title: string;
    price: number;
    soldCount: number;
    imageUrl: string;
    status: 'active' | 'inactive';
    createdAt: string;
    stock: number;
}

const SellPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data - Replace with actual API call
    const sellerProducts: SellerProduct[] = [
        {
            id: '1',
            title: 'Premium Wireless Headphones',
            price: 129.99,
            soldCount: 245,
            imageUrl: 'headphones',
            status: 'active',
            createdAt: '2024-01-15',
            stock: 45,
        },
        {
            id: '2',
            title: 'USB-C Fast Charging Cable',
            price: 24.99,
            soldCount: 1203,
            imageUrl: 'cable',
            status: 'active',
            createdAt: '2024-01-10',
            stock: 120,
        },
        {
            id: '3',
            title: 'Laptop Stand - Adjustable',
            price: 49.99,
            soldCount: 89,
            imageUrl: 'stand',
            status: 'inactive',
            createdAt: '2024-01-05',
            stock: 0,
        },
        {
            id: '4',
            title: 'Mechanical Keyboard RGB',
            price: 189.99,
            soldCount: 156,
            imageUrl: 'keyboard',
            status: 'active',
            createdAt: '2024-01-12',
            stock: 32,
        },
    ];

    const filteredProducts = sellerProducts.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.includes(searchTerm);
        const matchesFilter =
            filterStatus === 'all' || product.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const totalRevenue = filteredProducts.reduce(
        (sum, product) => sum + product.price * product.soldCount,
        0
    );
    const totalSold = filteredProducts.reduce(
        (sum, product) => sum + product.soldCount,
        0
    );

    const getPlaceholderColor = (type: string) => {
        const colors: { [key: string]: { bg: string; text: string } } = {
            headphones: { bg: 'bg-blue-100', text: 'text-blue-600' },
            cable: { bg: 'bg-green-100', text: 'text-green-600' },
            stand: { bg: 'bg-amber-100', text: 'text-amber-600' },
            keyboard: { bg: 'bg-purple-100', text: 'text-purple-600' },
        };
        return colors[type] || { bg: 'bg-slate-200', text: 'text-slate-600' };
    };

    const getPlaceholderEmoji = (type: string) => {
        const emojis: { [key: string]: string } = {
            headphones: '🎧',
            cable: '🔌',
            stand: '📱',
            keyboard: '⌨️',
        };
        return emojis[type] || '📦';
    };

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
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
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
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        {/* Product Info */}
                                        <td className="px-6 py-4 w-80">
                                            <div className="flex items-center gap-3">
                                                <div className={`relative w-12 h-12 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${getPlaceholderColor(product.imageUrl).bg}`}>
                                                    {getPlaceholderEmoji(product.imageUrl)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-slate-900 truncate">
                                                        {product.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        ID: {product.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4 w-28">
                                            <p className="text-sm font-semibold text-slate-900">
                                                ${product.price.toFixed(2)}
                                            </p>
                                        </td>

                                        {/* Sold Count */}
                                        <td className="px-6 py-4 w-24">
                                            <p className="text-sm text-slate-600 text-center">
                                                {product.soldCount}
                                            </p>
                                        </td>

                                        {/* Stock */}
                                        <td className="px-6 py-4 w-24">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {product.stock}
                                                </p>
                                                {product.stock === 0 && (
                                                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded font-medium">
                                                        Out
                                                    </span>
                                                )}
                                                {product.stock < 10 && product.stock > 0 && (
                                                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded font-medium">
                                                        Low
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-5 py-4 w-40 align-middle">
                                            <div className="flex items-center justify-center h-full">
                                                <span
                                                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${product.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-slate-200 text-slate-700'
                                                        }`}
                                                >
                                                    {product.status === 'active' ? '●' : '○'}{' '}
                                                    {product.status.charAt(0).toUpperCase() +
                                                        product.status.slice(1)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Date Added */}
                                        <td className="px-6 py-4 w-32">
                                            <p className="text-sm text-slate-600">
                                                {new Date(product.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 w-32">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    title="View"
                                                    className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    title="Edit"
                                                    className="p-2 hover:bg-amber-50 rounded-lg text-amber-600 hover:text-amber-700 transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    title="Delete"
                                                    className="p-2 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-700 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
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
                    <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        <Plus size={20} />
                        Add Your First Product
                    </button>
                </div>
            )}
        </div>
    );
};

export default SellPage;