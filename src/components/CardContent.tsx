import React, { forwardRef } from "react";
import { cn } from "../lib/utils";

// تعريف نوع الـ Props
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// مكون CardContent
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6", className)} {...props} />;
});

CardContent.displayName = "CardContent";

export { CardContent };
