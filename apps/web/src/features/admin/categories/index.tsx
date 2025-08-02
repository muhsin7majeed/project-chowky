import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">{t("categories")}</h1>
        <p className="text-muted-foreground">Manage product categories and their organization.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("categories")} Management</CardTitle>
          <CardDescription>This is a placeholder for the categories management functionality.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Categories management features will be implemented here, including:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Create and edit categories</li>
            <li>• Category hierarchy management</li>
            <li>• Category analytics and metrics</li>
            <li>• Bulk category operations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
