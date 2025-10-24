import * as React from "react"

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50">{children}</div>
    </div>
  )
}

export type DialogContentProps = React.HTMLAttributes<HTMLDivElement>

export function DialogContent({ className = "", children, ...props }: DialogContentProps) {
  return (
    <div
      className={`bg-[--color-background] rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

export function DialogHeader({ className = "", ...props }: DialogHeaderProps) {
  return <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
}

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export function DialogTitle({ className = "", ...props }: DialogTitleProps) {
  return <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
}

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export function DialogDescription({ className = "", ...props }: DialogDescriptionProps) {
  return <p className={`text-sm text-[--color-muted-foreground] ${className}`} {...props} />
}

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

export function DialogFooter({ className = "", ...props }: DialogFooterProps) {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
      {...props}
    />
  )
}
