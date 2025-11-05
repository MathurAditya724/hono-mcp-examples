import { MemoryEventStore, StreamableHTTPTransport } from "@hono/mcp";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import mcp from "./mcp.js";

const transport = new StreamableHTTPTransport({
  eventStore: new MemoryEventStore(),
  sessionIdGenerator: () => crypto.randomUUID(),
});

const app = new Hono().use(
  cors({
    origin: (origin) => origin,
    exposeHeaders: ["mcp-session-id"],
  })
);

app.all("/mcp", async (c) => {
  if (!mcp.isConnected()) {
    await mcp.connect(transport);
  }

  return transport.handleRequest(c);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
