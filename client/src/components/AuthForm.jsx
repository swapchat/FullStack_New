import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../api/apiService";
import { useAuth } from "../context/AuthContext";

export const AuthForm = ({ isLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = isLogin
        ? await apiService.login(data)
        : await apiService.register(data);
      if (isLogin) {
        const token = response.data.token;
        const userData = { email: data.email, token };
        login(userData);
        navigate("/dashboard");
      } else {
        alert("Registration successful! You can now log in.");
        navigate("/");
      }
    } catch (error) {
      console.error("error:", error);
      alert(error.response.data.msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6"
    >
      {!isLogin && (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: !isLogin })}
            className={`mt-1 block w-full p-3 border rounded-md transition duration-150 ease-in-out ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">Name is required</p>
          )}
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: true })}
          className={`mt-1 block w-full p-3 border rounded-md transition duration-150 ease-in-out ${
            errors.email
              ? "border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">Email is required</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            {...register("password", { required: true })}
            className={`mt-1 block w-full p-3 pr-10 border rounded-md transition duration-150 ease-in-out ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 focus:border-blue-500"
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">Password is required</p>
        )}
      </div>
      {isLogin ? (
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      ) : (
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline font-semibold">
            Login
          </Link>
        </p>
      )}

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};
