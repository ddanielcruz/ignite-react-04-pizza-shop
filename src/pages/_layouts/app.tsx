import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <h1>Pizza Shop</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
