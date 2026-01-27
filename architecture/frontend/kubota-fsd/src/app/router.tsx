import { Layout } from "@/app/ui/Layout"
import type { Equipment } from "@/entities/equipment"
import { EquipmentLayout, EquipmentPlaceholder } from "@/pages/equipment-layout"
import { EquipmentDetails } from "@/widgets/equipment-details"
import { createBrowserRouter, redirect } from "react-router-dom"

export const createMyAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          loader: () => redirect("/equipment"),
        },
        {
          path: "equipment",
          element: <EquipmentLayout />,

          children: [
            {
              index: true,
              element: <EquipmentPlaceholder />,
              handle: { crumb: () => "Equipment" },
            },
            {
              path: ":id",
              element: <EquipmentDetails />,
              handle: { crumb: (data: Equipment[]) => ({}) },
            },
          ],
        },
      ],
    },
  ])
