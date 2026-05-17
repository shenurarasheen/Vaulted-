import Image from "next/image";

const ProfileNavBottom = () => {

    return (
        <div className="w-60 h-14 bg-white border-t border-gray-200 flex items-center fixed bottom-0 left-0 shadow-sm px-4">
            <Image
                src="/images/default-profile-img.png"
                alt="default profile image"
                width={37}
                height={37}
                className="rounded-full bg-gray-300"
            />

            <div className="flex flex-col text-start ml-3">
                <span className="text-[12px] font-medium truncate">Shenura Rasheen</span>
                <span className="text-[10px] text-gray-500 truncate">shenurarasheen@gmail.com</span>
            </div>
        </div>
    )
}

export default ProfileNavBottom;