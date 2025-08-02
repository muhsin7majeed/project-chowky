import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/features/landing";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="max-w-4xl">
      <LandingPage />
    </div>
  );
}
