"use client";
import { StytchProvider } from "@stytch/nextjs";
import { StytchUIClient } from "@stytch/vanilla-js";
import type { PropsWithChildren } from "react";

export default function RootProviders({ children }: PropsWithChildren) {
  const stytchClient = new StytchUIClient(
    process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN!,
    {
      cookieOptions: {
        opaqueTokenCookieName: "stytch_session",
        jwtCookieName: "stytch_session_jwt",
        path: "/",
        availableToSubdomains: true,
        domain: "localhost",
      },
    },
  );

  return <StytchProvider stytch={stytchClient}>{children}</StytchProvider>;
}
