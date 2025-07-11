import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}

export const CreateButton = ({ children, href, onClick }: Props) => {
  return (
    <Button asChild={href ? true : false} className="gradient-bg-blue" onClick={onClick}>
      {href ? (
        <Link href={href}>
          <Plus className="mr-2 h-4 w-4" />
          {children}
        </Link>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          {children}
        </>
      )}
    </Button>
  );
};
