import { Slot } from "radix-ui"
import type { ButtonHTMLAttributes } from "react"
import { buttonStyle } from "./button.css.ts"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  variant?: keyof typeof buttonStyle
}

export const Button = (
  { asChild = false, variant = "default", ...props }: ButtonProps,
) => {
  const Comp = asChild ? Slot.Root : "button"

  return <Comp {...props} className={buttonStyle[variant]} />
}
