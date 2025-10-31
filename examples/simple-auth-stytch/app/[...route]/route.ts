import {
  bearerAuth,
  StreamableHTTPTransport,
  simpleMcpAuthRouter,
} from "@hono/mcp";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import { domain, validateStytchJWT } from "./auth";
import mcp from "./mcp";

const transport = new StreamableHTTPTransport();

const app = new Hono().use(
  cors({
    origin: (origin) => origin,
    credentials: true,
  }),
);

app.route(
  "/",
  simpleMcpAuthRouter({
    issuer: domain,
    resourceServerUrl: new URL("http://localhost:3000/mcp"),
  }),
);

app.all(
  "/mcp",
  bearerAuth({
    verifyToken: async (token, c) => {
      const verifyResult = await validateStytchJWT(token);

      c.set("result", verifyResult);

      return true;
    },
  }),
  async (c) => {
    if (!mcp.isConnected()) {
      // Connecting the MCP server to the transport
      await mcp.connect(transport);
    }

    return transport.handleRequest(c as any);
  },
);

export const GET = handle(app);
export const POST = handle(app);
export const OPTIONS = handle(app);
