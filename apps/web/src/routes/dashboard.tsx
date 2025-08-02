import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();

  const navigate = Route.useNavigate();

  const privateData = useQuery(trpc.privateData.queryOptions());

  useEffect(() => {
    if (!session && !isPending) {
      navigate({
        to: "/login",
      });
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="grid gap-6">
        <section className="rounded-lg border p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p className="text-lg mb-2">Welcome {session?.user.name}</p>
          <p className="text-muted-foreground">
            Private Data: {privateData.data?.message}
          </p>
        </section>
      </div>
    </div>
  );
}
