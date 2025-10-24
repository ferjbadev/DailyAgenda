import * as React from "react"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] w-full rounded-md border border-[--color-input] bg-[--color-background] px-3 py-2 text-sm placeholder:text-[--color-muted-foreground] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
