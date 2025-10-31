import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const mcpServer = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

mcpServer.tool(
  "greet",
  "A simple greeting tool",
  { name: z.string().describe("Name to greet") },
  async ({ name }): Promise<CallToolResult> => {
    return { content: [{ type: "text", text: `Hello, ${name}!` }] };
  },
);

export default mcpServer;
