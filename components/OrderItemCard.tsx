import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type OrderProps = {
    id: string;
    date: string;
    status: string;
    statusColor: string;
    statusIcon: React.ElementType;
    products: { name: string; price: string; quantity: number; image: string }[],
    total: string;
    trackingNo: string;
}

export const OrderItemCard = ({ order }: { order: OrderProps}) => {

    const StatusIcon = order.statusIcon;

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500 mt-1">Ordered on {order.date}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${order.statusColor} font-semibold text-sm`}>
                    <StatusIcon size={18} />
                    {order.status}
                </div>
            </div>

            {/* Order Content */}
            <div className="flex items-center gap-6">
                {/* Product Image */}
                <div className="shrink-0">
                    <Image
                        src={order.products[0].image}
                        alt={order.products[0].name}
                        width={120}
                        height={120}
                        unoptimized
                        className="rounded-xl object-cover bg-gray-100"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{order.products[0].name}</h4>
                    <p className="text-gray-600 text-sm mt-1">
                        Quantity: <span className="font-medium">{order.products[0].quantity}x</span>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        Tracking: <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{order.trackingNo}</span>
                    </p>
                </div>

                {/* Order Summary */}
                <div className="text-right shrink-0">
                    <p className="text-sm text-gray-600">Order Total</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{order.total}</p>
                </div>

                {/* Action Button */}
                <button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all duration-200 flex items-center justify-center">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Footer Info */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <div className="flex gap-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                        View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                        Reorder
                    </button>
                </div>
                <p className="text-xs text-gray-500">Last updated: 2 hours ago</p>
            </div>
        </div>
    )
}

export default OrderItemCard;