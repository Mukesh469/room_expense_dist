import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({
    name,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required = false,
    icon: Icon,
    iconPosition = "left",
    className = ""
}) => {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="flex flex-col gap-1 w-full">

            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative w-full">

                {Icon && (
                    <span
                        className={`absolute top-1/2 -translate-y-1/2 text-gray-400 
                        ${iconPosition === "left" ? "left-3" : "right-3"}`}
                    >
                        <Icon size={18} />
                    </span>
                )}

                {type === "password" && (
                    <span className="absolute top-1/2 -translate-y-1/2 text-gray-400 right-3 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </span>
                )}

                <input
                    name={name}
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`
                        border rounded-lg w-full
                        px-4 py-2 md:py-3 focus:ring-2 focus:ring-[#f1832e] outline-none
                        ${Icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
                        ${error ? "border-red-500" : "border-gray-300"}
                        ${className}
                    `}
                />
            </div>

            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
};

export default InputField;