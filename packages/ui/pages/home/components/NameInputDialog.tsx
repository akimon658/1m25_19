import { type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../../components/Button.tsx"
import { Dialog } from "../../../components/Dialog.tsx"

export type FormValues = {
  name: string
  reading: string
}

type NameInputDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: SubmitHandler<FormValues>
}

export const NameInputDialog = (
  { open, onOpenChange, onSubmit }: NameInputDialogProps,
) => {
  const { formState: { isValid }, handleSubmit, register } = useForm<
    FormValues
  >()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content>
        <Dialog.Title>あなたの名前は？</Dialog.Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="名前"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="読み方（任意）"
            {...register("reading")}
          />

          <Dialog.Control>
            <Button disabled={!isValid} type="submit" variant="primary">
              OK
            </Button>
          </Dialog.Control>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
