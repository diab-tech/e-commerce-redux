// Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(({ className = "", id, ...rest }, ref) => {
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        id={id}
        placeholder=" "
        className={`peer block w-full appearance-none border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/60 backdrop-blur-md text-gray-900 dark:text-white rounded-md px-3 pt-6 pb-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 ${className}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className="absolute left-3 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
            peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-500 dark:peer-focus:text-indigo-400 bg-white dark:bg-gray-800 px-1"
      >
        {rest["aria-label"] || "Field"}
      </label>
    </div>
  );
});

export default Input;
