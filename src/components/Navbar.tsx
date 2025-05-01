import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { RootState } from "../app/store";
import { logout, clearMessages } from "../app/features/counter/authSlice";
import { setTheme } from "../app/features/counter/themeSlice";
import { debounce } from "lodash-es";
import toast from "react-hot-toast";
import Button from "./ui/Button";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { accessToken, successMessage } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const debouncedLogout = useCallback(
    debounce(() => {
      dispatch(logout());
      navigate("/login");
    }, 300),
    [dispatch, navigate],
  );

  useEffect(() => {
    if (successMessage && successMessage.includes("Logged out")) {
      toast.success(successMessage, {
        className: "bg-blue-600 dark:bg-blue-500 text-white rounded-md shadow-lg p-4",
        position: "top-center",
        duration: 4000,
        style: { width: "fit-content" },
      });
      dispatch(clearMessages());
    }
  }, [successMessage, dispatch]);

  const handleThemeSelect = (selectedTheme: "light" | "dark" | "system") => {
    if (selectedTheme !== theme) {
      console.log(`Changing theme from ${theme} to ${selectedTheme}`);
      dispatch(setTheme(selectedTheme));
    }
    setIsDropdownOpen(false);
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "☀️ Light";
      case "dark":
        return "🌙 Dark";
      case "system":
        return "⚙️ System";
      default:
        return "⚙️ System";
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 text-[var(--text-primary)] dark:text-white py-2 px-6 shadow-md">
      <ul className="flex flex-row justify-between list-none items-center">
        <div className="left flex gap-4">
          {accessToken && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "transition-all duration-300 text-fuchsia-400 underline dark:text-white cursor-pointer font-bold dark:hover:text-white"
                    : "transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-fuchsia-200 dark:hover:text-white cursor-pointer"
                }
              >
                Home
              </NavLink>
            </li>
          )}
          {accessToken && (
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "transition-all duration-300 text-fuchsia-400 underline dark:text-white cursor-pointer font-bold dark:hover:text-white"
                    : "transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-fuchsia-200 dark:hover:text-white cursor-pointer"
                }
              >
                Cart {items.length > 0 && `(${items.length})`}
              </NavLink>
            </li>
          )}
        </div>
        <div className="right flex gap-4">
          {accessToken && (
            <li>
              <Button variant="danger" size="sm" onClick={debouncedLogout}>
                Logout
              </Button>
            </li>
          )}
          <li className="relative">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2"
              aria-label="Toggle theme"
              aria-expanded={isDropdownOpen}
            >
              {getThemeLabel()}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 z-10">
                <button
                  onClick={() => handleThemeSelect("light")}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  ☀️ Light
                </button>
                <button
                  onClick={() => handleThemeSelect("dark")}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  🌙 Dark
                </button>
                <button
                  onClick={() => handleThemeSelect("system")}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  ⚙️ System
                </button>
              </div>
            )}
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
