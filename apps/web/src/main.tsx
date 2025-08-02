import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import Loader from "./components/loader";
import { authClient } from "./lib/auth-client";
import { routeTree } from "./routeTree.gen";
import "./lib/i18n"; // Initialize i18n

import { QueryClientProvider } from "@tanstack/react-query";
import type { User } from "./types/user";
import { queryClient, trpc } from "./utils/trpc";

function RouterApp() {
  const { data: session, isPending } = authClient.useSession();

  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPendingComponent: () => <Loader />,
    context: {
      trpc,
      queryClient,
      auth: {
        isAuthenticated: !!session?.user,
        user: (session?.user as User) || null,
        isAdmin: session?.user?.role === "admin",
        isPending,
      },
    },
    Wrap: function WrapComponent({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    },
  });

  return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterApp />);
}
