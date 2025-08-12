import { ArrowRight, CheckCircle, Heart, Shield, Star, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage = () => {
  const features = [
    {
      id: "lightning-fast",
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Lightning Fast",
      description: "Optimized performance with modern architecture for seamless shopping experience.",
    },
    {
      id: "secure-payments",
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Secure Payments",
      description: "Bank-level security with encrypted transactions and fraud protection.",
    },
    {
      id: "fast-delivery",
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping with real-time tracking across the globe.",
    },
    {
      id: "support",
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any questions.",
    },
  ];

  const productCategories = [
    {
      id: "electronics",
      title: "Electronics",
      description: "Latest gadgets and tech accessories",
      imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=250&fit=crop&crop=center",
      productCount: "1,200+ products",
    },
    {
      id: "fashion",
      title: "Fashion",
      description: "Trendy clothing and accessories",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&crop=center",
      productCount: "2,500+ products",
    },
    {
      id: "home-garden",
      title: "Home & Garden",
      description: "Everything for your living space",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop&crop=center",
      productCount: "800+ products",
    },
    {
      id: "sports-fitness",
      title: "Sports & Fitness",
      description: "Gear for active lifestyle",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center",
      productCount: "600+ products",
    },
  ];

  const testimonials = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      role: "Verified Customer",
      content: "Amazing shopping experience! Fast delivery and excellent quality products. Highly recommended!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      role: "Verified Customer",
      content: "Best online store I've used. Great customer service and competitive prices. Will shop again!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: "emily-davis",
      name: "Emily Davis",
      role: "Verified Customer",
      content: "Love the variety of products and the user-friendly interface. Shopping here is a pleasure!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop&crop=center"
            alt="Shopping background"
            className="h-full w-full object-cover opacity-5"
          />
        </div>
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Your Ultimate
            <span className="text-primary"> Shopping</span>
            <br />
            Destination
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Discover thousands of quality products at unbeatable prices. From electronics to fashion, we have everything
            you need with fast delivery and exceptional service.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              Browse Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing the best shopping experience with these key features.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.id} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
              Explore our wide range of product categories to find exactly what you're looking for.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <Card key={category.id} className="group cursor-pointer transition-all hover:shadow-lg">
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={category.imageUrl}
                    alt={category.title}
                    className="h-full w-full object-cover transition-all group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                  <p className="text-sm font-medium text-primary">{category.productCount}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={`${testimonial.id}-star-${i}`} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-2xl bg-primary/5 p-12">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Shopping?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of satisfied customers and discover amazing products at great prices.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-lg">
                <CheckCircle className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                View All Products
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free shipping on orders over $50 • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
