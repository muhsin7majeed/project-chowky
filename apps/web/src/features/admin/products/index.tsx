import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">{t("products")}</h1>
        <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("products")} Management</CardTitle>
          <CardDescription>This is a placeholder for the products management functionality.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Products management features will be implemented here, including:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Add and edit products</li>
            <li>• Inventory management</li>
            <li>• Product analytics and performance</li>
            <li>• Bulk product operations</li>
            <li>• Product categories assignment</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
