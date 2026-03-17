import { Outlet } from "react-router-dom"
import Sidebar from "../../common/sidebar/Sidebar"
import DashboardHeader from "./pages/dashboard/DashboardHeader"
import { useState } from "react"
import { useContext } from "react"
import UserContext from "../../../context/user/UserContext"
import { useEffect } from "react"
import { useRef } from "react"

const DashboardLayout = () => {
    const { user, getCurrentUser } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMenu, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev)
        if (menuRef.current && menuRef.current.value) { setIsOpen(prev => !prev) }
    }

    const toggleMenu = () => { setIsMenuOpen(prev => !prev); };

    useEffect(() => { getCurrentUser() }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) { setIsMenuOpen(false) }
        };

        if (isOpenMenu) { document.addEventListener("mousedown", handleClickOutside) }

        return () => { document.removeEventListener("mousedown", handleClickOutside) };
    }, [isOpenMenu]);

    return (
        <div className="flex h-screen overflow-hidden">

            <Sidebar isOpen={isOpen} onClose={toggleSidebar} />

            <div className="flex flex-col flex-1 overflow-hidden">

                <DashboardHeader toggleSidebar={toggleSidebar} toggleMenu={toggleMenu} user={user} isOpenMenu={isOpenMenu} menuRef={menuRef} />

                <main className="flex-1 overflow-y-auto px-2  bg-gray-50">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

export default DashboardLayout