import { CircleAlert, ShieldAlert } from "lucide-react";
import Button from "./Button";

const PriceDetailsSection = ({itemsQty, itemsPrice, shippingCost} : PriceDetailsSectionProps) => {
    const subtotal = itemsPrice + shippingCost;

    return (

        <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
            <table className="table-auto w-full">
                <tbody>
                    <tr className="flex justify-between items-center">
                        <td className="text-[13px]">items ({itemsQty})</td>
                        <td className="text-14px] font-semibold">${itemsPrice.toFixed(2)}</td>
                    </tr>
                    <tr className="flex justify-between items-center mt-2">
                        <td className="text-[13px] flex items-center gap-2">Shipping <CircleAlert size={14} /></td>
                        <td className="text-[14px] font-semibold">${shippingCost.toFixed(2)}</td>
                    </tr>

                    <tr>
                        <td className="py-4"><hr className="w-full border border-gray-200" /></td>
                    </tr>

                    <tr className="flex justify-between items-center">
                        <td className="text-xl font-semibold">Subtotal</td>
                        <td className="text-xl font-semibold">${subtotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <Button
                title="Go to Checkout"
                className="bg-blue-600 w-full mt-5"
            />
            <p className="text-xs my-4 flex items-center justify-center gap-1"><ShieldAlert size={20} color="#2563EB" />Purchase protected by <span className="text-xs font-semibold underline">Vaulted Money Back Guarantee</span></p>
        </div>
    )
}

export default PriceDetailsSection;