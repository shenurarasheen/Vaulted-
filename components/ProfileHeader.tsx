import { CheckCircle, Edit2 } from "lucide-react"
import Image from "next/image"

type ProfileData = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string
}

const ProfileHeader = ({ setIsEditing, isEditing, formData }: { setIsEditing: (isEditing: boolean) => void, isEditing: boolean, formData: ProfileData }) => {

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <Image
                            src={`https://ui-avatars.com/api/?name=Shenura+Rasheen&background=random&size=128`}
                            alt="User profile image"
                            width={96}
                            height={96}
                            className="rounded-full border-4 border-blue-100"
                        />
                        <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-md">
                            <Edit2 size={16} />
                        </button>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h1>
                        <p className="text-gray-500 mt-1">{formData.email}</p>
                        <div className="flex items-center gap-2 mt-3">
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-sm text-green-600 font-medium">Profile verified</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${isEditing
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        }`}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>
        </div>
    )
}