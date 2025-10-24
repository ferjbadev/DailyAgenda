import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md"
    
    const variants = {
      default: "bg-[--color-primary] text-[--color-primary-foreground] border-2 border-[--color-primary] hover:bg-[--color-primary]/90 hover:border-[--color-primary]/90",
      outline: "border-2 border-[--color-primary] bg-transparent text-[--color-primary] hover:bg-[--color-primary]/10",
      ghost: "border-2 border-transparent hover:bg-[--color-accent] hover:text-[--color-accent-foreground] hover:border-[--color-accent]",
      destructive: "bg-[--color-destructive] text-[--color-destructive-foreground] border-2 border-[--color-destructive] hover:bg-[--color-destructive]/90 hover:border-[--color-destructive]/90",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
