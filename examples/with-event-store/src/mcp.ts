import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";

const mcpServer = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

mcpServer.registerTool(
  "greet",
  {
    title: "Greet User",
    description: "A simple greeting tool",
    inputSchema: { name: z.string().describe("Name to greet") },
  },
  async ({ name }) => {
    // Sending a notification to the client
    await mcpServer.server.notification({
      method: "custom_notification",
      params: { name },
    });

    // Returning a response
    return { content: [{ type: "text", text: `Hello, ${name}!` }] };
  }
);

export default mcpServer;
