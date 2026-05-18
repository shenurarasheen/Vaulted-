"use client";

import Image from "next/image";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";
import OrderItemCard from "@/components/OrderItemCard";

const OrdersPage = () => {
    const orders = [
        {
            id: "ORD-001",
            date: "May 15, 2026",
            status: "Delivered",
            statusColor: "bg-green-100 text-green-700",
            statusIcon: CheckCircle,
            products: [
                { name: "Premium Wireless Headphones", price: "$149.99", quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" }
            ],
            total: "$149.99",
            trackingNo: "TRK123456789"
        },
        {
            id: "ORD-002",
            date: "May 10, 2026",
            status: "In Transit",
            statusColor: "bg-blue-100 text-blue-700",
            statusIcon: Truck,
            products: [
                { name: "Smart Watch Pro", price: "$299.99", quantity: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop" }
            ],
            total: "$299.99",
            trackingNo: "TRK123456790"
        },
        {
            id: "ORD-003",
            date: "May 5, 2026",
            status: "Processing",
            statusColor: "bg-yellow-100 text-yellow-700",
            statusIcon: Clock,
            products: [
                { name: "USB-C Cable 2-Pack", price: "$24.99", quantity: 2, image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop" }
            ],
            total: "$49.98",
            trackingNo: "TRK123456791"
        },
        {
            id: "ORD-004",
            date: "April 28, 2026",
            status: "Delivered",
            statusColor: "bg-green-100 text-green-700",
            statusIcon: CheckCircle,
            products: [
                { name: "Portable Phone Stand", price: "$19.99", quantity: 1, image: "https://images.unsplash.com/photo-1586253408361-f6c2416fd7f0?w=300&h=300&fit=crop" }
            ],
            total: "$19.99",
            trackingNo: "TRK123456792"
        }
    ];

    return (
        <div className="w-full bg-gray-50 min-h-screen p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600 mt-2">Track and manage all your orders</p>
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 gap-6">
                {orders.map((order, index) => (
                    <OrderItemCard key={index} order={order} />
                ))}
            </div>

            {/* Empty State (optional - uncomment if needed) */}
            {/* <div className="flex flex-col items-center justify-center py-16">
                <Package size={64} className="text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600">No orders yet</h2>
                <p className="text-gray-500 mt-2">Start shopping to place your first order</p>
            </div> */}
        </div>
    );
};

export default OrdersPage;