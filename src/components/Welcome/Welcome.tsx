"use client";

import { Button } from "@telegram-apps/telegram-ui";
import React from "react";
import { useRouter } from "next/navigation";

export const Welcome = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const buttonClick = (e) => {
    const path = "/cars";
    const params = new URLSearchParams({
      page: "0",
    });
    const targetURL = new URL(path, window.location.toString());
    e.preventDefault();
    router.push(`${targetURL.toString()}?${params.toString()}`);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Button mode="filled" size="l" onClick={buttonClick}>
        Просмотр каталога авто
      </Button>
    </div>
  );
};
