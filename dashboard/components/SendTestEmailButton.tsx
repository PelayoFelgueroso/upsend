"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Props {
  onSend: () => Promise<void>;
  children: ReactNode;
}

export const SendTestEmailButton = ({ onSend, children }: Props) => {
  const [sendingTest, setSendingTest] = useState(false);

  const handleSend = async () => {
    setSendingTest(true);
    await onSend;
    setSendingTest(false);
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSend}
      disabled={sendingTest}
    >
      <Send className="mr-2 h-4 w-4" />
      {sendingTest ? "Sending..." : children}
    </Button>
  );
};
