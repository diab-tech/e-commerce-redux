import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { registerSchema } from "../validation/inedx";
import { register, clearMessages } from "../app/features/counter/authSlice";
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
  const { loading, error, successMessage } = useAppSelector((state) => state.auth);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
        className: "bg-green-500 text-white rounded-md shadow-lg p-4",
      });
      dispatch(clearMessages());
      navigate("/login"); // إعادة توجيه للـ dashboard بعد التسجيل
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
        className: "bg-red-500 dark:bg-red-400 text-white rounded-md shadow-lg p-4",
      });
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch, navigate]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(register({ credentials: data, navigate })).unwrap();
    } catch (err) {
      console.error("Register error:", err);
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
              <Input
                id="username"
                type="text"
                aria-label="Username"
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
              <Input
                id="email"
                type="email"
                aria-label="Email"
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
              <Input
                id="password"
                type="password"
                aria-label="Password"
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
              isLoading={isLoading}
            >
              Register
            </Button>

            {/* Link to Login */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 underline underline-offset-4"
                aria-label="Sign in"
              >
                {` Sign in`}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
