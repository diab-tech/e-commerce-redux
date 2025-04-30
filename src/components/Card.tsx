import React, { forwardRef } from "react";
import { cn } from "../lib/utils";

// تعريف نوع الـ Props
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// مكون Card
const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700",
        className,
      )}
      role="region"
      {...props}
    />
  );
});

Card.displayName = "Card";

export { Card };
