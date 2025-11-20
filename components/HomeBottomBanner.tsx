import Image from "next/image";
import Button from "./Button";
import BannerImage from "./BannerImage";

const HomeBottomBanner = () => {
    return (
        <div className="relative w-full bg-gray-100 my-16 flex items-center justify-between rounded-lg py-12 px-10">
            <div className="space-y-3 max-md:items-center">
                <h1 className="md:text-4xl text-2xl font-semibold">Top tech for your ride</h1>
                <p className="max-md:text-sm">Explore in-car entertainment, GPS, security devices, and more.</p>
                <Button
                    title="Shop Now"
                    className="bg-black mt-3"
                />
            </div>
            <div className="flex md:gap-5 gap-2 items-center max-md:w-full max-md:hidden">
                <BannerImage alt="b-img1" src="/images/banner-images/b-img1.png"/>
                <BannerImage alt="b-img2" src="/images/banner-images/b-img2.png"/>
                <BannerImage alt="b-img3" src="/images/banner-images/b-img3.png"/>
            </div>
        </div>
    )
}

export default HomeBottomBanner;