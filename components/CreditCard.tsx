import { CheckCircle, Edit2, Trash2 } from "lucide-react";

const VirtualCreditCard = ({ card }: { card: CreditCardProps }) => {

    const getCardColor = (cardType: string) => {
        switch (cardType) {
            case "Visa":
                return "from-blue-300 to-blue-400";
            case "Mastercard":
                return "from-red-300 to-orange-400";
            case "American Express":
                return "from-green-300 to-emerald-400";
            default:
                return "from-gray-300 to-gray-400";
        }
    };

    return (
        <div
            key={card.id}
            className={`relative h-56 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl ${card.isDefault ? "ring-2 ring-blue-500" : ""
                }`}
        >
            {/* Card Background Gradient */}
            <div className={`absolute inset-0 bg-linear-to-br ${getCardColor(card.cardType)}`}></div>

            {/* Default Badge */}
            {card.isDefault && (
                <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
                    <CheckCircle size={14} />
                    Default
                </div>
            )}

            {/* Card Content */}
            <div className="relative h-full p-6 flex flex-col justify-between text-gray-800">
                {/* Top Section */}
                <div>
                    <p className="text-sm opacity-70 font-medium text-gray-700">{card.cardType}</p>
                </div>

                {/* Middle Section - Card Number */}
                <div>
                    <p className="text-2xl font-mono font-bold tracking-wider">{card.cardNumber}</p>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs opacity-60 text-gray-700">Card Holder</p>
                        <p className="font-semibold text-sm text-gray-800">{card.cardHolder}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs opacity-60 text-gray-700">Expires</p>
                        <p className="font-semibold text-sm font-mono text-gray-800">{card.expiryDate}</p>
                    </div>
                </div>
            </div>

            {/* Hover Action Buttons */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-all">
                    <Edit2 size={20} />
                </button>
                <button className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-all">
                    <Trash2 size={20} />
                </button>
            </div>

            {/* Last Used Info */}
            <div className="absolute bottom-4 left-6 bg-white bg-opacity-40 backdrop-blur-sm px-3 py-1 rounded-lg text-gray-700 text-xs font-medium">
                Last used: {card.lastUsed}
            </div>
        </div>
    )
}

export default VirtualCreditCard;