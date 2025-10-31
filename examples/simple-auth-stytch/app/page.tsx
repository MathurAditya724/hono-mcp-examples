"use client";

import { useStytchSession } from "@stytch/nextjs";
import Link from "next/link";

export default function Home() {
  const { session } = useStytchSession();

  if (session) {
    return <pre>{JSON.stringify(session, null, 2)}</pre>;
  }

  return <Link href="/login">Login</Link>;
}
