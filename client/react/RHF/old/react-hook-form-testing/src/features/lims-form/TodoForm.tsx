import { useForm, SubmitHandler } from "react-hook-form"
import { useLazyGetNotesByIdQuery, useLazyGetSamplesByIdQuery } from "./api"

type Inputs = {
  foo: string
}

export default function LimsForm() {
  const [triggerNotes, getNotesQuery] = useLazyGetNotesByIdQuery()
  const [triggerSamples, getSamplesQuery] = useLazyGetSamplesByIdQuery()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<Inputs>({
    defaultValues: async () => {
      const notes = await triggerNotes(null).unwrap()
      const samples = await triggerSamples(null).unwrap()

      console.log("notes", notes)
      console.log("samples", samples)

      return { foo: "bar" }
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <>
      <p>form loading: {isLoading ? "true" : "false"}</p>
      <p>notes query fetching: {getNotesQuery.isFetching ? "true" : "false"}</p>

      <form
        id="form-id"
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <input {...register("foo")} />
        {/* <input type="number" {...register("userId")} />
        <input type="number" {...register("id")} />
        <input {...register("title")} />
        <input type="checkbox" {...register("completed")} /> */}
      </form>

      <input form="form-id" type="submit" />

      {Object.values(errors).length >= 1 && (
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      )}
    </>
  )
}
