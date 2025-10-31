"use client";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthenticatePage() {
  const stytch = useStytch();
  const router = useRouter();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      if (token) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [stytch, session]);

  return <pre>{JSON.stringify(session ?? {}, null, 2)}</pre>;
}
