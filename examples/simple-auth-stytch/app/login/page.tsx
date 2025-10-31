"use client";
import { StytchLogin } from "@stytch/nextjs";

export default function LoginPage() {
  return (
    <StytchLogin
      config={{
        products: ["emailMagicLinks"],
        emailMagicLinksOptions: {
          loginRedirectURL: "http://localhost:3000/authenticate",
        },
      }}
    />
  );
}
