import { Link, Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-4 py-4 border-b">
        <Link to="/equipment">Equipment</Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
