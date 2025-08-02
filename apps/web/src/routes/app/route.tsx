import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	beforeLoad: ({ context }) => {
		if (context.auth.isPending) {
			// Still loading auth state, let it continue
			return;
		}
		
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/auth/login",
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}