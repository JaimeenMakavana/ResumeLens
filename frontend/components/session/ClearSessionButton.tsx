"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { useSession } from "@/hooks/useSession";

export function ClearSessionButton() {
  const { clearSession, sessionId } = useSession();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!sessionId) {
    return null;
  }

  const handleClear = () => {
    if (isConfirming) {
      clearSession();
      setIsConfirming(false);
    } else {
      setIsConfirming(true);
      // Reset confirmation after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  return (
    <Button
      variant={isConfirming ? "danger" : "primary"}
      size="sm"
      onClick={handleClear}
    >
      {isConfirming ? "Confirm Clear" : "Clear Session"}
    </Button>
  );
}

