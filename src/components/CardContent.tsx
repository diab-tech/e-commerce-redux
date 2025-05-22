
import React, { forwardRef } from "react";
import { cn } from "../lib/utils";

/**
 * Properties for the CardContent component.
 *
 * This component is a wrapper around a div tag. It accepts all the usual
 * props for a div tag, plus a `className` prop which is used to set the
 * class name on the div.
 *
 * @typedef {Object} CardContentProps
 * @property {string} [className] - The class name for the div.
 * @prop {React.HTMLAttributes<HTMLDivElement>} ...props - Any other props
 *   are passed straight through to the div tag.
 */

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6", className)} {...props} />;
});

CardContent.displayName = "CardContent";

export { CardContent };
