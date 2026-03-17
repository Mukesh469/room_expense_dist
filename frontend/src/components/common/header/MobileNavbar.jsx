import { headerData } from "./headerData"
import { Link, useNavigate } from 'react-router-dom';

const MobileNavbar = ({ show = false, onClose }) => {
    const navigate = useNavigate();
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
        <div
            className={`lg:hidden fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-2xl">
                    ✕
                </button>
            </div>

            <ul className="flex flex-col items-center justify-center lg:hidden  gap-4 text-gray-700 text-sm">
                {headerData.map((item) => {
                    if (item.type === "link") {
                        return (
                            <li key={item.name} className="hover:text-orange-500 cursor-pointer">
                                <Link to={item.path}>{item.name}</Link>
                            </li>
                        );
                    }

                    if (item.type === "button") {
                        return (
                            <button
                                key={item.name}
                                className="rounded-xl px-2 py-2 bg-[#0a3069] hover:bg-[#092356] text-white cursor-pointer"
                                onClick={() => handleAction(item.action)}
                            >
                                {item.name}
                            </button>
                        );
                    }

                    return null;
                })}
            </ul>

        </div>
    )
}

export default MobileNavbar