import React from "react";

const SellerStatusCard = ({ title, count, icon, iconBg }: { title: string, count: number | string, icon: React.ReactNode, iconBg: string }) => {

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-600 text-sm font-medium">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                        {count}
                    </p>
                </div>
                <div className={`p-3 rounded-lg ${iconBg}`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default SellerStatusCard;