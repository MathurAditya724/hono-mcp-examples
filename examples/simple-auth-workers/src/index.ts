import {
  bearerAuth,
  StreamableHTTPTransport,
  simpleMcpAuthRouter,
} from "@hono/mcp";
import { Hono } from "hono";
import { cors } from "hono/cors";
import mcp from "./mcp";

const app = new Hono().use(
  cors({
    origin: (origin) => origin,
    credentials: true,
  }),
);

const domain = "[domain]"; // TODO: Add your Auth Provider's project domain

app.route(
  "/",
  simpleMcpAuthRouter({
    issuer: domain,
    resourceServerUrl: new URL("http://localhost:8787/mcp"), // URL where you serve your mcp
  }),
);

const transport = new StreamableHTTPTransport();
app.all(
  "/mcp",
  bearerAuth({
    verifyToken: async (token, c) => {
      // TODO: Verify the token

      return true;
    },
  }),
  async (c) => {
    if (!mcp.isConnected()) {
      // Connecting the MCP server to the transport
      await mcp.connect(transport);
    }

    return transport.handleRequest(c);
  },
);

export default app;
