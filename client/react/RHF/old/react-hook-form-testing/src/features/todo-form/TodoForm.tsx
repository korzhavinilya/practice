import { useForm, SubmitHandler } from "react-hook-form"
import { useLazyGetTodoByIdQuery } from "./api"

type Inputs = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default function TodoForm() {
  const [trigger, getTodoByIdQuery] = useLazyGetTodoByIdQuery()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Inputs>({
    defaultValues: async () => {
      const first = await trigger("1").unwrap()
      const second = await trigger("2").unwrap()
      const third = await trigger("3").unwrap()
      const fourth = await trigger("4").unwrap()

      return {
        userId: first.userId,
        id: second.id,
        title: third.title,
        completed: fourth.completed,
      }
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <>
      <p>form loading: {isLoading ? "true" : "false"}</p>
      <p>query fetching: {getTodoByIdQuery.isFetching ? "true" : "false"}</p>

      <form
        id="form-id"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <input type="number" {...register("userId")} />
        <input type="number" {...register("id")} />
        <input {...register("title")} />
        <input type="checkbox" {...register("completed")} />
      </form>

      <input form="form-id" type="submit" />

      {Object.values(errors).length >= 1 && (
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      )}
    </>
  )
}
