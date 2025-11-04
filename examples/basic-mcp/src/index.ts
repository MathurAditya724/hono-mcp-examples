import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";
import { cors } from "hono/cors";
import mcp from "./mcp";

const transport = new StreamableHTTPTransport();

const app = new Hono().use(cors());

app.all("/mcp", async (c) => {
  if (!mcp.isConnected()) {
    await mcp.connect(transport);
  }

  return transport.handleRequest(c);
});

export default app;
