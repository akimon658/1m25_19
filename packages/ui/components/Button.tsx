import { Slot } from "radix-ui"
import type { ButtonHTMLAttributes } from "react"
import { buttonStyle } from "./button.css.ts"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: "default" | "primary"
}

export const Button = (
  { asChild = false, variant = "default", disabled, ...props }: ButtonProps,
) => {
  const Comp = asChild ? Slot.Root : "button"
  let buttonVariant: keyof typeof buttonStyle = variant

  if (variant === "primary" && disabled) {
    buttonVariant = "primaryDisabled"
  }

  return (
    <Comp
      {...props}
      className={buttonStyle[buttonVariant]}
      disabled={disabled}
    />
  )
}
