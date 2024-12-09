import { createFileRoute, Outlet } from '@tanstack/react-router';
import { userQueryOptions } from '@/lib/api';

export const Route = createFileRoute('/__authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;
    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return data;
    } catch (e) {
      return { user: null };
    }
  },
  component: () => {
    const { user } = Route.useRouteContext();
    if (!user) {
      return 'Login page';
    }
    return <Outlet />;
  },
});
