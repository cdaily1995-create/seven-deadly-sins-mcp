import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: process.execPath,
  args: ["src/index.js"],
  stderr: "inherit"
});

const client = new Client({ name: "smoke-test", version: "0.0.0" });
await client.connect(transport);

const { tools } = await client.listTools();
console.log("tools:", tools.map((t) => t.name));

const result = await client.callTool({ name: "get_questions", arguments: {} });
const data = JSON.parse(result.content[0].text);

const perSin = {};
for (const q of data.questions) perSin[q.sin] = (perSin[q.sin] || 0) + 1;

console.log("questions:", data.questions.length);
console.log("per sin:", perSin);
console.log("reverse items:", data.questions.filter((q) => q.reverse).length);

const ok =
  tools.length === 1 &&
  tools[0].name === "get_questions" &&
  data.questions.length === 21 &&
  Object.keys(perSin).length === 7 &&
  Object.values(perSin).every((n) => n === 3);

await client.close();
if (!ok) {
  console.error("SMOKE TEST FAILED");
  process.exit(1);
}
console.log("SMOKE TEST OK");
