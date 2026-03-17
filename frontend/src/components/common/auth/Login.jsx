import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../InputField";
import Button from "../Button";
import AuthContext from "../../../context/auth/AuthContext";
import { validateAuthField } from "../../../utils/inputValidation/validateAuthField";
import { FiPhone, FiLock } from "react-icons/fi";


const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    phone: "",
    password: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value
    }));

    const errorMessage = validateAuthField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(loginForm).forEach((field) => {
      const error = validateAuthField(field, loginForm[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const data = await login(loginForm.phone, loginForm.password);
      if (data.success) {
        toast.success(data.message || "Login Successfully!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      } else {  
        toast.error(data.message || "Wrong Password! Try again")
      }
    } catch (error) {
      console.log("Login Component Error: ", error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen grid sm:grid-cols-2">
      <div className="order-2 sm:order-1">
        <img
          src="https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg"
          alt="auth background"
          className="h-full"
        />
      </div>

      <form className="flex flex-col gap-4 items-center justify-center px-3 sm:px-6 lg:px-10 order-1 sm:order-2">

        <h1 className="capitalize text-2xl sm:text-4xl font-bold mx-auto">
          Welcome Back
        </h1>
        <p className="text-gray-500 text-sm">Enter your credentials to continue</p>

        <div className="w-full sm:w-2/3">
          <InputField
            name="phone"
            label="Phone"
            placeholder="e.g. 9811234568"
            value={loginForm.phone}
            required={true}
            onChange={handleChange}
            icon={FiPhone}
            error={errors.phone}
          />

          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="e.g. ********"
            value={loginForm.password}
            required={true}
            icon={FiLock}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        <div className="w-full sm:w-1/2">
          <Button
            type="submit"
            loading={loading}
            handleSubmit={handleSubmit}
          >
            Login
          </Button>
        </div>

        <p className="text-sm mx-auto">
          Not registered yet?
          <Link to="/register" className="text-blue-500 underline">
            {" "} Click here
          </Link>
        </p>
        <Link to="/" className="text-sm underline">Forget password ? </Link>
      </form>
    </div>
  );
};

export default Login;