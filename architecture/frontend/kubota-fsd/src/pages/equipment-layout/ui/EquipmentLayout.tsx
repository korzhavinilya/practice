import { EquipmentList } from "@/widgets/equipment-list"
import { Outlet } from "react-router-dom"

export function EquipmentLayout() {
  return (
    <div className="flex">
      <aside className="w-64 mr-4">
        <EquipmentList />
      </aside>

      <Outlet />
    </div>
  )
}
