import { useEffect } from "react";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-md",
}) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`relative bg-white rounded-xl shadow-xl w-full ${width} mx-4 animate-scaleIn`}
            >
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Modal;