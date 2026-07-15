"use client";

import { Edit2, Eye, Trash2 } from "lucide-react";

const SellerProductRow = ({ product, onView }: { product: ProductProps; onView: (product: ProductProps) => void }) => {

    const getPlaceholderEmoji = (type: string) => {
        const emojis: { [key: string]: string } = {
            headphones: '🎧',
            cable: '🔌',
            stand: '📱',
            keyboard: '⌨️',
        };
        return emojis[type] || '📦';
    };

    const getPlaceholderColor = (type: string) => {
        const colors: { [key: string]: { bg: string; text: string } } = {
            headphones: { bg: 'bg-blue-100', text: 'text-blue-600' },
            cable: { bg: 'bg-green-100', text: 'text-green-600' },
            stand: { bg: 'bg-amber-100', text: 'text-amber-600' },
            keyboard: { bg: 'bg-purple-100', text: 'text-purple-600' },
        };
        return colors[type] || { bg: 'bg-slate-200', text: 'text-slate-600' };
    };

    return (
        <>
            <tr
                key={product._id}
                className="hover:bg-slate-50 transition-colors"
            >
                {/* Product Info */}
                <td className="px-6 py-4 w-80">
                    <div className="flex items-center gap-3">
                        <div className={`relative w-12 h-12 rounded-lg flex items-center justify-center text-lg shrink-0 ${getPlaceholderColor(product.category).bg}`}>
                            {getPlaceholderEmoji(product.category)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-900 truncate">
                                {product.title}
                            </p>
                            <p className="text-xs text-slate-500">
                                ID: {product._id}
                            </p>
                        </div>
                    </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 w-28">
                    <p className="text-sm font-semibold text-slate-900">
                        ${product.basePrice.toFixed(2)}
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
                            onClick={() => onView(product)}
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
        </>
    )
}

export default SellerProductRow;