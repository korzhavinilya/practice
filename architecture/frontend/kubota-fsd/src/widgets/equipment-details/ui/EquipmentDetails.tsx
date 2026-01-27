import { equipmentApi } from "@/entities/equipment/api/queries"
import { useParams } from "react-router-dom"

export function EquipmentDetails() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = equipmentApi.useGetEquipmentListQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: data?.find(item => item.id === id),
      isLoading,
    }),
  })

  if (isLoading) {
    return <div>Details Loading...</div>
  }

  if (!data) {
    return <div>Equipment Not Found</div>
  }

  return (
    <div className="flex flex-col">
      <h2>Equipment Details</h2>
      <p>Model: {data.model}</p>
    </div>
  )
}
