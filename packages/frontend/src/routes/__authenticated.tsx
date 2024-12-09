import { createFileRoute, Outlet } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'


export const Route = createFileRoute('/__authenticated')({
  beforeLoad: async ({ location }) => {
    return {user: null}
  },
  component: () => {
    const {user } = Route.useRouteContext();
    if (!user) {
      return "Login page"
      }
      return <Outlet />
  }
})

