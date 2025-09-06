import { type ComponentProps } from "react"
import { inputStyle } from "./input.css.ts"

type InputProps = ComponentProps<"input">

export const Input = ({ className, ...props }: InputProps) => {
  return <input className={`${inputStyle} ${className ?? ""}`} {...props} />
}
