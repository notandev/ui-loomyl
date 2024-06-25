import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../state/AuthProvider";
const SidebarProfile = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    }
    return (
        <div className="flex bg-white">
            <div className="hidden sm:block w-1/5 bg-b">
                <div id="logo-sidebar" className="h-full transition-transform -translate-x-full border border-r-4 border-gray-200 sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-max overflow-y-auto bg-white">
                        <h2 className="text-black font-semibold text-center py-6 mb-1">Profile Account</h2>
                        <div className="border border-b-4 mb-20"></div>
                        <ul className="space-y-2 font-medium px-12">
                            <li>
                                <Link to="/landing-page" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                        <i className="fa-solid fa-house"></i>
                                    </span>
                                    <span className="text-sm font-medium">Beranda</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user-profile/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <span className="text-sm font-medium">Profil</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user-profile/email" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                        <i className="fa-solid fa-envelope"></i>
                                    </span>
                                    <span className="text-sm font-medium">Email</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/user-profile/password" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                        <i className="fa-solid fa-lock"></i>
                                    </span>
                                    <span className="text-sm font-medium">Kata Sandi</span>
                                </Link>
                            </li>
                            <li className="fixed bottom-0 pb-10">
                                <Link to="/" className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                        <i className="fa-solid fa-right-from-bracket"></i>
                                    </span>
                                    <button onClick={handleLogout} className="text-sm font-medium">Keluar</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-4/5">
                <Outlet />
            </div>
        </div>
    )
}

export default SidebarProfile;