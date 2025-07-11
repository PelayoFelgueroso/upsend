import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export const BackToButton = ({ href, children }: Props) => {
  return (
    <Button variant="secondary" asChild>
      <Link href={href}>
        <ArrowLeft className="h-4 w-4" /> Back to {children}
      </Link>
    </Button>
  );
};
