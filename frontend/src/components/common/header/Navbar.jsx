import { useState } from "react";
import { headerData } from "./headerData";
import MobileNavbar from "./MobileNavbar";
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow((prev) => !prev);
    }

    const handleAction = (action) => {
        switch (action) {
            case "auth":
                navigate("/login");
                break;

            case "language":
                console.log("Toggle Language Here");
                // language change
                break;

            default:
                break;
        }
    };

    return (
        <nav className='flex justify-between items-center px-2 lg:px-12  py-1 bg-gray-100 shadow sticky top-0 z-100'>
            <div className='flex items-center gap-2'>
                <img src="/logo.png" alt="room expense logo" className='h-12 rounded-xl ' />
                <h1 className='text-sm md:text-lg '>ROOM_EXPENSE</h1>
            </div>

            <ul className="hidden lg:flex items-center gap-4 text-gray-700 text-sm">
                {headerData.map((item) => {
                    if (item.type === "link") {
                        return (
                            <li key={item.name} className="hover:text-orange-500 cursor-pointer">
                                <Link to={item.path} className=" text-md lg:text-lg text-gray-600">{item.name}</Link>
                            </li>
                        );
                    }

                    if (item.type === "button") {
                        return (
                            <button
                                key={item.name}
                                className="rounded-xl px-2 py-2 bg-[#f96c1b] hover:bg-[#FF701A] text-white cursor-pointer"
                                onClick={() => handleAction(item.action)}
                            >
                                {item.name}
                            </button>
                        );
                    }

                    return null;
                })}
            </ul>

            <button className='lg:hidden text-2xl' onClick={handleToggle}>☰</button>

            <MobileNavbar show={show} onClose={handleToggle} />
        </nav>
    )
}

export default Navbar