import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

import InputField from "../InputField";
import Button from "../Button";
import AuthContext from "../../../context/auth/AuthContext";
import { validateAuthField } from "../../../utils/inputValidation/validateAuthField";

const Register = () => {
    const { register, loading } = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRegisterForm((prev) => ({
            ...prev,
            [name]: value
        }));

        const errorMessage = validateAuthField(name, value);
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        Object.keys(registerForm).forEach((field) => {
            const error = validateAuthField(field, registerForm[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        try {
            const data = await register(registerForm);

            if (data.success) {
                toast.success(data.message || "Registered successfully!");

                setRegisterForm({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                });

                setErrors({});

                setTimeout(() => {
                    navigate("/dashboard");
                }, 800);

            } else {
                toast.error(data.message || "Registration failed");
            }

        } catch (error) {
            console.log("Register Error:", error);
            toast.error("Internal Server Error");
        }
    };
    return (
        <div className="min-h-screen grid sm:grid-cols-2">

            <div className="order-2 sm:order-1">
                <img
                    src="https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg"
                    alt="auth background"
                    className="h-full object-cover"
                />
            </div>

            <form
                className="flex flex-col gap-4 items-center justify-center px-3 sm:px-6 lg:px-10 order-1 sm:order-2"
            >

                <h1 className="capitalize text-2xl sm:text-4xl font-bold">
                    Create Account
                </h1>

                <p className="text-gray-500 text-sm">
                    Fill the details to register
                </p>

                <div className="w-full sm:w-2/3">

                    <InputField
                        name="name"
                        label="Full Name"
                        placeholder="e.g. Mukesh Kumar"
                        value={registerForm.name}
                        onChange={handleChange}
                        icon={FiUser}
                        required
                        error={errors.name}
                    />

                    <InputField
                        name="email"
                        label="Email"
                        placeholder="e.g. mukesh@gmail.com"
                        value={registerForm.email}
                        onChange={handleChange}
                        icon={FiMail}
                        required
                        error={errors.email}
                    />

                    <InputField
                        name="phone"
                        label="Phone"
                        placeholder="e.g. 9811234567"
                        value={registerForm.phone}
                        onChange={handleChange}
                        icon={FiPhone}
                        required
                        error={errors.phone}
                    />

                    <InputField
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="********"
                        value={registerForm.password}
                        onChange={handleChange}
                        icon={FiLock}
                        required
                        error={errors.password}
                    />

                    <InputField
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="********"
                        value={registerForm.confirmPassword}
                        onChange={handleChange}
                        icon={FiLock}
                        required
                        error={errors.confirmPassword}
                    />

                </div>

                <div className="w-full sm:w-1/2">
                    <Button
                        type="submit"
                        loading={loading}
                        handleSubmit={handleSubmit}
                    >
                        Register
                    </Button>
                </div>

                <p className="text-sm">
                    Already registered?
                    <Link
                        to="/login"
                        className="text-blue-500 underline"
                    >
                        {" "} Login here
                    </Link>
                </p>

            </form>
        </div>
    );
};

export default Register;