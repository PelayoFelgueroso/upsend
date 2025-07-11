import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">EmailPro</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#docs"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Documentation
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
