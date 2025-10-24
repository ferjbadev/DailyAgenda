import * as React from "react"

export type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-[--color-border] bg-[--color-card] text-[--color-card-foreground] shadow-sm ${className}`}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

export { Card }
