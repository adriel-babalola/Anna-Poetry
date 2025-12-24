import { assets } from "@/assets/images/assets";
import Sidebar from "@/components/adminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from "@/components/adminComponents/LogoutButton";

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark"/>
                <Sidebar />
                <div className="flex flex-col sticky top-0 left-0 right-0 w-full">
                    <div className="sticky top-0 left-0 z-50 bg-white flex items-center justify-between w-full py-3 max-h-[60px] px-4 sm:px-12 border-b boreder-black">
                        <h3 className="font-medium text-sm sm:text-base">Admin Panel</h3>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <Image src={assets.profile_rose} alt='' className="rounded-full object-center w-8 h-8 sm:w-10 sm:h-10" width={40} />
                            <LogoutButton />
                        </div>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}