import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { trpc } from "@/utils/trpc";

const LandingPage = () => {
  const { t } = useTranslation();
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <div>
      <pre className="my-4 overflow-x-auto font-mono text-lg">
        E-Commerce Landing Page
      </pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                healthCheck.data ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-muted-foreground text-sm">
              {healthCheck.isLoading
                ? t("loading")
                : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
