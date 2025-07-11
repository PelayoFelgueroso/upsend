import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Code, Globe, Shield, Mail, Zap } from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: Code,
      title: "Developer-First API",
      description:
        "RESTful API with comprehensive documentation and SDKs for popular languages",
      badge: "API",
    },
    {
      icon: Mail,
      title: "Template Management",
      description:
        "Create, manage, and version your email templates with our intuitive editor",
      badge: "Templates",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track opens, clicks, bounces, and more with detailed analytics dashboard",
      badge: "Analytics",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "SOC 2 compliant with end-to-end encryption and secure API authentication",
      badge: "Security",
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description:
        "Send emails from multiple regions for optimal deliverability worldwide",
      badge: "Global",
    },
    {
      icon: Zap,
      title: "High Performance",
      description:
        "Handle millions of emails with our scalable infrastructure and smart queuing",
      badge: "Performance",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to send emails
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From simple transactional emails to complex marketing campaigns,
            we&apos;ve got you covered with enterprise-grade features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
