"use client";

import React from "react";
import { ChevronDown } from "@/components/ui/icons";
import { Button } from "@/components/ui";

interface ScrollToBottomButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

/**
 * ScrollToBottomButton component displays a floating button to scroll to the bottom
 * of the message list when the user has scrolled up.
 */
export function ScrollToBottomButton({
  onClick,
  isVisible,
}: ScrollToBottomButtonProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
      <Button
        variant="secondary"
        size="sm"
        onClick={onClick}
        className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Scroll to bottom"
      >
        <ChevronDown className="w-4 h-4 animate-bounce-subtle" />
        <span className="sr-only">Scroll to bottom</span>
      </Button>
    </div>
  );
}

