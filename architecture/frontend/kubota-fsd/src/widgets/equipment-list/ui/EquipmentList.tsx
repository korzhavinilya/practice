import { equipmentApi } from "@/entities/equipment/api/queries"
import { useNavigate } from "react-router-dom"

export function EquipmentList() {
  const navigate = useNavigate()
  const { data, isLoading } = equipmentApi.useGetEquipmentListQuery()

  if (isLoading) {
    return <div>Equipment Loading...</div>
  }

  return (
    <ul>
      {data?.map(item => (
        <li
          key={item.id}
          className="cursor-pointer w-fit"
          onClick={() => navigate(item.id, { replace: false })}
        >
          {item.model}
        </li>
      ))}
    </ul>
  )
}
