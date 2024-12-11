import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
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
    const navigate = useNavigate();
    if (!user) {
      return navigate({ to: '/login' });
    }
    return <Outlet />;
  },
});
