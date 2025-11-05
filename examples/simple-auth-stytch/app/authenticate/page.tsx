"use client";
import { useStytch, useStytchSession } from "@stytch/nextjs";
import { useEffect } from "react";
import {useOnLoginComplete} from "@/utils/auth";

export default function AuthenticatePage() {
  const stytch = useStytch();
  const onLoginComplete = useOnLoginComplete();
  const { session } = useStytchSession();

  useEffect(() => {
    if (session) {
      onLoginComplete();
    } else {
      const token = new URLSearchParams(window.location.search).get("token");
      if (token) {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        });
      }
    }
  }, [stytch, session, onLoginComplete]);

  return <pre>{JSON.stringify(session ?? {}, null, 2)}</pre>;
}
