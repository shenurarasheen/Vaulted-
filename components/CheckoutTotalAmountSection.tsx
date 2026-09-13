"use client";

function Button({ title, className = "", onClick }: { title: string, className: string, onClick: () => void }) {
    return (
        <button
            className={`font-medium text-white transition-colors cursor-pointer ${className}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

const CheckoutTotalAmountSection = ({ subtotal, shipping, tax, total, handlePlaceOrder }: { subtotal: number, shipping: number, tax: number, total: number, handlePlaceOrder: () => void }) => {

    return (
        <div className="border border-gray-200 rounded-lg p-6 lg:sticky lg:top-[121px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-gray-900 text-[17px] font-medium">{subtotal.toFixed(2)} LKR</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-900 font-medium">{shipping.toFixed(2)} LKR</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="text-gray-900 font-medium">{tax.toFixed(2)} LKR</span>
                </div>
            </div>

            <hr className="border-gray-100 my-4" />

            <div className="flex justify-between items-center">
                <span className="text-[15px] font-medium text-gray-900">Total</span>
                <span className="text-2xl font-semibold text-gray-900">{total.toFixed(2)} LKR</span>
            </div>

            <Button
                title="Place Order"
                className="w-full bg-blue-600 hover:bg-blue-500 mt-6 py-4 rounded-4xl text-sm"
                onClick={() => handlePlaceOrder()}
            />

            <p className="text-xs text-gray-400 text-center mt-3">
                By placing your order, you agree to our terms and conditions
            </p>
        </div>
    )
}

export default CheckoutTotalAmountSection;