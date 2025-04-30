import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { IFormInput } from "../interface";
import { loginSchema } from "../validation/inedx";
import { login } from "../app/features/counter/authSlice";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, error } = location.state || { from: { pathname: "/" }, error: null };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (error) {
      console.error("Error from ProtectedRoute:", error);
      toast.error(error, {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
    }
  }, [error]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", data);
      await dispatch(login({ credentials: data, navigate })).unwrap();
      toast.success("Logged in successfully", {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error || "Failed to log in";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 56px)" }}
      className=" flex items-center justify-center bg-gradient-to-br from-fuchsia-300 to-indigo-400 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-900 p-6"
    >
      <Card className="w-full max-w-md bg-[var(--card-background)] shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-busy={isLoading}>
            <div className="text-center">
              <h1 className="text-3xl font-bold dark:text-white">Welcome Back</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 ">
                Log in to your account
              </p>
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                aria-label="Email"
                {...register("email")}
                className={errors.email ? "border-red-500 dark:border-red-500" : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="ml-auto text-sm text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline"
                  aria-label="Forgot password?"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
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
            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full bg-[var(--button-background)] hover:bg-[var(--button-background-hover)] text-white transition-colors duration-200"
            >
              Login
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              Don’t have an account?
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 underline underline-offset-4"
                aria-label="Sign up"
              >
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
