import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Check, Info, X } from "lucide-react";

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
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="rounded-lg border p-6 bg-primary text-primary-foreground">
        <h1 className="text-3xl font-bold mb-4">Custom Color Theme Dashboard</h1>
        <p className="text-lg mb-2">Welcome {session?.user.name}</p>
        <p className="text-primary-foreground/80">
          Private Data: {privateData.data?.message}
        </p>
        <p className="text-sm text-primary-foreground/70 mt-2">
          Theme: #7F55B1 • #9B7EBD • #F49BAB • #FFE1E0
        </p>
      </section>

      {/* Color Palette Demo */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Primary Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Colors</CardTitle>
            <CardDescription>Main brand colors from #7F55B1</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                <p className="font-medium">Primary (#7F55B1)</p>
                <p className="text-sm opacity-90">Now using hex values!</p>
              </div>
              <div className="bg-primary-foreground text-primary p-4 rounded-lg border">
                <p className="font-medium">Primary Foreground</p>
                <p className="text-sm opacity-75">Text on primary background</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary & Accent Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Secondary & Accent</CardTitle>
            <CardDescription>Supporting colors from your palette</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
                <p className="font-medium">Secondary (#FFE1E0)</p>
                <p className="text-sm opacity-90">Very light pink base</p>
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded-lg">
                <p className="font-medium">Accent (#F49BAB)</p>
                <p className="text-sm opacity-90">Pink highlight color</p>
              </div>
              <div className="bg-muted text-muted-foreground p-4 rounded-lg">
                <p className="font-medium">Muted (#9B7EBD)</p>
                <p className="text-sm">Lighter purple for subtle elements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Button Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>Different button styles with your custom theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-medium">Default Buttons</h4>
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">State Buttons</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="destructive">
                  <X className="mr-2 h-4 w-4" />
                  Destructive
                </Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Sizes</h4>
              <div className="flex flex-wrap gap-2 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Forms */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input fields and form controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-input">Demo Input</Label>
              <Input 
                id="demo-input" 
                placeholder="Type something..." 
                className="focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label>Form States</Label>
              <div className="space-y-2">
                <Input placeholder="Normal state" />
                <Input placeholder="Focus state" className="ring-2 ring-primary" />
                <Input 
                  placeholder="Error state" 
                  className="border-destructive ring-destructive" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status & Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Badges</CardTitle>
            <CardDescription>Various status indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Badge Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Default
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    Secondary
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-primary text-primary">
                    Outline
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive text-white">
                    Destructive
                  </span>
                </div>
              </div>
              <hr className="border-border" />
              <div>
                <h4 className="font-medium mb-2">Status Icons</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Success status</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Info className="h-4 w-4" />
                    <span>Info status</span>
                  </div>
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Warning status</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Colors Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Colors</CardTitle>
          <CardDescription>Data visualization colors based on your custom palette</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {[
              { name: "Chart 1", class: "bg-chart-1" },
              { name: "Chart 2", class: "bg-chart-2" },
              { name: "Chart 3", class: "bg-chart-3" },
              { name: "Chart 4", class: "bg-chart-4" },
              { name: "Chart 5", class: "bg-chart-5" },
            ].map((color) => (
              <div key={color.name} className="text-center">
                <div className={`${color.class} h-16 rounded-lg mb-2`} />
                <p className="text-sm font-medium">{color.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Background Variations */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-background border rounded-lg p-6">
          <h3 className="font-medium mb-2">Default Background</h3>
          <p className="text-muted-foreground text-sm">Standard background color</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-medium mb-2">Card Background</h3>
          <p className="text-muted-foreground text-sm">Elevated card surface</p>
        </div>
        <div className="bg-accent rounded-lg p-6">
          <h3 className="font-medium mb-2 text-accent-foreground">Accent Background</h3>
          <p className="text-accent-foreground/80 text-sm">Highlighted surface</p>
        </div>
      </div>
    </div>
  );
}
