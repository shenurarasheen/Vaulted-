import Button from "./Button";

const OfferBanner = () => {
    return (
        <div className="w-full h-30 bg-gray-100 rounded-xl my-16 px-10 flex items-center justify-between">
            <div className="space-y-1">
            <h1 className="text-xl font-semibold">30% Offer for Luxury Items</h1>
            <p className="text-sm">Enjoy reliability, secure deliveries and hassle-free returns.</p>
            </div>
            <Button
            title="Shop Now"
            className="bg-black"
            />
        </div>
    )
}

export default OfferBanner;