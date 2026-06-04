import { CheckCircle, Edit2, Trash2 } from "lucide-react";

const ShippingAddressCard = ({ address, addressId, handleAddressDelete }: { address: ShippingAddress, addressId: string, handleAddressDelete: (addressId: string) => void }) => {

    return (
        <div
            className={`bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-md ${address.isDefault ? "ring-2 ring-blue-500" : ""
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{address.name}</h3>
                {address.isDefault && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle size={14} />
                        Default
                    </span>
                )}
            </div>

            {/* Address Details */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-900 font-medium">{`${address.addressLine1}, ${address.addressLine2}`}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">City</p>
                        <p className="text-gray-900 font-medium">{address.city}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Postal Code</p>
                        <p className="text-gray-900 font-medium">{address.postalCode}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Country</p>
                        <p className="text-gray-900 font-medium">{address.country}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="text-gray-900 font-medium">{address.phone}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium">
                    <Edit2 size={18} />
                    Edit
                </button>
                <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all font-medium"
                    onClick={() => handleAddressDelete(addressId)}
                >
                    <Trash2 size={18} />
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ShippingAddressCard;