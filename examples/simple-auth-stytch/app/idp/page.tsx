"use client";
import { IdentityProvider } from "@stytch/nextjs";
import {withLoginRequired} from "@/utils/auth";

export default withLoginRequired(function IDPPage() {
  return <IdentityProvider />;
})
