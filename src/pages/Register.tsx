import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { registerSchema } from "../validation/inedx";
import { register } from "../app/features/counter/authSlice";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(register({ credentials: data, navigate })).unwrap();
      toast.success("Registered successfully! Logging you in...", {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
      navigate("/login"); // إعادة توجيه للـ dashboard بعد التسجيل
    } catch (error: any) {
      toast.error(error || "Failed to register", {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-6">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-busy={isLoading}>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Sign up to get started
              </p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-gray-700 dark:text-gray-200">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...formRegister("username")}
                className={errors.username ? "border-red-500" : ""}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...formRegister("email")}
                className={errors.email ? "border-red-500" : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...formRegister("password")}
                className={errors.password ? "border-red-500" : ""}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              disabled={isLoading}
              aria-label={isLoading ? "Processing" : "Register"}
            >
              {isLoading ? (
                <>
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                "Register"
              )}
            </Button>

            {/* Link to Login */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 underline underline-offset-4"
                aria-label="Sign in"
              >
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
