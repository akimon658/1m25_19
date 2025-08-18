import type { ButtonHTMLAttributes } from "react"
import { buttonStyle } from "./button.css.ts"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonStyle
}

export const Button = ({ variant = "default", ...props }: ButtonProps) => {
  return <button {...props} className={buttonStyle[variant]} />
}
