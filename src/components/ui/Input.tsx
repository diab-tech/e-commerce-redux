// Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ className = "", id, ...rest }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={id}
          placeholder=" "
          className={`input-field block border-1 border-gray-200 text-[var(--text-primary)] rounded-md
                        focus:border-none
                        outline-none
            focus:ring-1
             focus:ring-fuchsia-300 
            dark:focus:border-fuchsia-300 ${className}`}
          {...rest}
        />
        <label htmlFor={id} className="input-label ">
          {rest["aria-label"] || "Field"}
        </label>
      </div>
    );
  }
);

export default Input;
