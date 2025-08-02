import { createFileRoute } from "@tanstack/react-router";
import SettingsPage from "@/features/admin/settings";

export const Route = createFileRoute("/admin/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsPage />;
}
