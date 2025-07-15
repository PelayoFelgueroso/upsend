"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Globe,
  Code,
  Database,
  TrendingUp,
  Copy,
  Play,
  Sparkles,
  Terminal,
  Package,
  MousePointer,
} from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/theme/components/ThemeToggle";

const features = [
  {
    icon: Mail,
    title: "Smart Email Management",
    description:
      "Advanced template system with real-time preview and multi-language support",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive insights with delivery rates, open rates, and engagement metrics",
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast API",
    description:
      "High-performance REST API with rate limiting and real-time processing",
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "JWT authentication, encrypted data, and SOC 2 compliance ready",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Comprehensive API documentation with SDKs and code examples",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Multi-region deployment with 99.9% uptime guarantee",
    color: "text-cyan-500",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const stats = [
  {
    label: "Emails Delivered",
    value: "10M+",
    icon: Mail,
    color: "text-blue-500",
  },
  {
    label: "Active Users",
    value: "50K+",
    icon: Users,
    color: "text-green-500",
  },
  {
    label: "API Calls/Month",
    value: "100M+",
    icon: Database,
    color: "text-purple-500",
  },
  {
    label: "Uptime",
    value: "99.9%",
    icon: TrendingUp,
    color: "text-orange-500",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    content:
      "EmailManager transformed our communication workflow. The API is incredibly reliable and the analytics are game-changing.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer at StartupX",
    content:
      "Best email platform we've used. The template system and multi-language support saved us months of development.",
    rating: 5,
    avatar: "MR",
  },
  {
    name: "Emily Watson",
    role: "Product Manager at ScaleUp",
    content:
      "The dashboard is intuitive and the API documentation is excellent. Our team was up and running in minutes.",
    rating: 5,
    avatar: "EW",
  },
];

const codeExample = `import { EasyMailJS } from 'email-app-pelayo';

const emailClient = new EasyMailJS(
  'your-api-key',
  'your-secret-key'
);

// Send an email using a template
const result = await emailClient.send({
  templateId: 'welcome-email',
  to: 'user@example.com',
  variables: {
    name: 'John Doe',
    company: 'Acme Corp'
  }
});

console.log('Email sent:', result);`;

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCodeRunning, setIsCodeRunning] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!");
  };

  const runCodeDemo = () => {
    setIsCodeRunning(true);
    setTimeout(() => {
      setIsCodeRunning(false);
      toast.success("Email sent successfully! 🚀");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Mouse follower gradient */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-600 animate-pulse">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              EmailManager
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/dashboard/documentation"
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              Documentation
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section ref={heroRef} className="container py-24 md:py-32 relative">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge
              variant="secondary"
              className="mb-4 animate-bounce bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Now with AI-powered templates
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Email Management
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-x">
                Reimagined
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              The most powerful email platform for developers. Send, track, and
              analyze emails with our lightning-fast API and beautiful
              dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                asChild
                className="text-lg px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 bg-transparent hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-600/10 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/dashboard/documentation">View Documentation</Link>
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 animate-float">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl" />
            </div>
            <div className="absolute top-40 right-20 animate-float-delayed">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl" />
            </div>
            <div className="absolute bottom-20 left-1/4 animate-float-slow">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 blur-xl" />
            </div>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 delay-${
                  index * 200
                } transform hover:scale-110 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div className="relative">
                    <stat.icon
                      className={`h-8 w-8 ${stat.color} animate-pulse`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-current to-transparent rounded-full opacity-20 animate-ping" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Demo Section */}
        <section className="container py-24 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Get Started in Seconds
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Install our package and start sending emails with just a few lines
              of code
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-purple-600/5 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">
                      Quick Start Example
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        copyToClipboard("npm install email-app-pelayo")
                      }
                      className="bg-transparent hover:bg-primary/10"
                    >
                      <Package className="mr-1 h-3 w-3" />
                      Install
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(codeExample)}
                      className="bg-transparent hover:bg-primary/10"
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      onClick={runCodeDemo}
                      disabled={isCodeRunning}
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      {isCodeRunning ? (
                        <>
                          <div className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Running...
                        </>
                      ) : (
                        <>
                          <Play className="mr-1 h-3 w-3" />
                          Run Demo
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex">
                  {/* Installation Step */}
                  <div className="flex-1 p-6 border-r border-border/50">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <span>Install the package</span>
                      </div>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto border">
                          <code className="text-primary font-mono">
                            npm install email-app-pelayo
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="flex-1 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <span>Send your first email</span>
                      </div>
                      <div className="relative">
                        <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto border max-h-64">
                          <code className="font-mono">
                            <span className="text-blue-500">import</span>{" "}
                            <span className="text-yellow-500">
                              {"{ EasyMailJS }"}
                            </span>{" "}
                            <span className="text-blue-500">from</span>{" "}
                            <span className="text-green-500">
                              'email-app-pelayo'
                            </span>
                            ;{"\n\n"}
                            <span className="text-blue-500">const</span>{" "}
                            <span className="text-purple-500">emailClient</span>{" "}
                            = <span className="text-blue-500">new</span>{" "}
                            <span className="text-yellow-500">EasyMailJS</span>(
                            {"\n  "}
                            <span className="text-green-500">
                              'your-api-key'
                            </span>
                            ,{"\n  "}
                            <span className="text-green-500">
                              'your-secret-key'
                            </span>
                            {"\n"});
                            {"\n\n"}
                            <span className="text-gray-500">
                              // Send an email using a template
                            </span>
                            {"\n"}
                            <span className="text-blue-500">const</span>{" "}
                            <span className="text-purple-500">result</span> ={" "}
                            <span className="text-blue-500">await</span>{" "}
                            <span className="text-purple-500">emailClient</span>
                            .<span className="text-yellow-500">send</span>({"{"}
                            {"\n  "}
                            <span className="text-red-500">
                              templateId
                            </span>:{" "}
                            <span className="text-green-500">
                              'welcome-email'
                            </span>
                            ,{"\n  "}
                            <span className="text-red-500">to</span>:{" "}
                            <span className="text-green-500">
                              'user@example.com'
                            </span>
                            ,{"\n  "}
                            <span className="text-red-500">
                              variables
                            </span>: {"{"}
                            {"\n    "}
                            <span className="text-red-500">name</span>:{" "}
                            <span className="text-green-500">'John Doe'</span>,
                            {"\n    "}
                            <span className="text-red-500">company</span>:{" "}
                            <span className="text-green-500">'Acme Corp'</span>
                            {"\n  "}
                            {"}"}
                            {"\n"});
                          </code>
                        </pre>
                        {isCodeRunning && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <div className="text-center">
                              <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                              <p className="text-sm font-medium text-green-600">
                                Sending email...
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Everything you need to scale
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From startups to enterprise, our platform grows with your business
              needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`transition-all duration-700 delay-${
                  index * 100
                } hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <CardHeader className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MousePointer className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Trusted by developers worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers are saying about EmailManager
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-600/5" />
              <CardContent className="text-center relative z-10">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    )
                  )}
                </div>
                <blockquote className="text-xl mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary scale-125"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-3xl font-bold">Free</div>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>1,000 emails/month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>5 templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Basic analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>API access</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-transparent hover:bg-primary/10"
                  variant="outline"
                  asChild
                >
                  <Link href="/dashboard">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-primary shadow-2xl scale-105 bg-gradient-to-br from-primary/5 to-purple-600/5">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-purple-600 text-white">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-3xl font-bold">
                  $29<span className="text-lg font-normal">/month</span>
                </div>
                <CardDescription>For growing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>50,000 emails/month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Unlimited templates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Custom domains</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link href="/dashboard">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold">Custom</div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Unlimited emails</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>White-label solution</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Dedicated support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>SLA guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Custom integrations</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-transparent hover:bg-primary/10"
                  variant="outline"
                  asChild
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <Card className="bg-gradient-to-r from-primary via-purple-600 to-cyan-500 text-white border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to transform your email workflow?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of developers who trust EmailManager for their
                email needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90 transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/dashboard">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="/dashboard/documentation">
                    View Documentation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 backdrop-blur-sm">
        <div className="container py-12 mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-600">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  EmailManager
                </span>
              </div>
              <p className="text-muted-foreground">
                The most powerful email platform for developers and businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link
                  href="#features"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/dashboard/documentation"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/careers"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EmailManager. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
