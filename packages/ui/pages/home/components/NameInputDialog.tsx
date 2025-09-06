import { type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"
import { Input } from "../../../components/Input.tsx"
import { formStyle } from "./nameInputDialog.css.ts"

export type FormValues = {
  name: string
  reading: string
}

type NameInputDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: SubmitHandler<FormValues>
  isPending: boolean
}

export const NameInputDialog = (
  { open, onOpenChange, onSubmit, isPending }: NameInputDialogProps,
) => {
  const { formState: { isValid }, handleSubmit, register } = useForm<
    FormValues
  >()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>あなたの名前は？</Dialog.Title>

        <form className={formStyle} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="名前"
            {...register("name", { required: true })}
          />
          <Input
            type="text"
            placeholder="読み方（任意）"
            {...register("reading")}
          />

          <Dialog.Control>
            <Button
              disabled={!isValid || isPending}
              loading={isPending}
              type="submit"
              variant="primary"
            >
              OK
            </Button>
          </Dialog.Control>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
