import { createRemoteJWKSet, jwtVerify } from "jose";

export const domain = process.env.STYTCH_DOMAIN!;
const projectId = process.env.STYTCH_PROJECT_ID!;

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

export async function validateStytchJWT(token: string) {
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${domain}/.well-known/jwks.json`));
  }

  return await jwtVerify(token, jwks, {
    algorithms: ["RS256"],
    audience: projectId,
    issuer: [domain],
    typ: "JWT",
  });
}
