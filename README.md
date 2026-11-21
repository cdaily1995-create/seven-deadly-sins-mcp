# Seven Deadly Sins MCP

An MCP server that serves the question set of the [7 Deadly Sins Test](https://7deadlysinstest.info/) — 21 statements, three per sin, answered on a 7-point scale and scored 0–100 for all seven sins.

It exposes one tool:

| Tool | Returns |
| --- | --- |
| `get_questions` | The 21 statements, the sin each one scores, which of them are reverse-scored, the 1–7 answer scale, and the formula that turns answers into seven scores. |

With the questions in context, an assistant can run the test in chat: have someone rate each statement from 1 to 7, then compute every sin's score.

## Install

### Claude Code

```bash
claude mcp add seven-deadly-sins -- npx -y seven-deadly-sins-mcp
```

### Claude Desktop

Add this to `claude_desktop_config.json` (`~/Library/Application Support/Claude/` on macOS, `%APPDATA%\Claude\` on Windows):

```json
{
  "mcpServers": {
    "seven-deadly-sins": {
      "command": "npx",
      "args": ["-y", "seven-deadly-sins-mcp"]
    }
  }
}
```

### Cursor

In **Settings → MCP → Add new MCP server**, choose `command` and enter:

```bash
npx -y seven-deadly-sins-mcp
```

## What it returns

```json
{
  "test": "7 Deadly Sins Test",
  "site": "https://7deadlysinstest.info/",
  "questionCount": 21,
  "scale": { "min": 1, "max": 7, "labels": { "1": "strongly disagree", "4": "neutral", "7": "strongly agree" } },
  "scoring": {
    "statementsPerSin": 3,
    "reverseRule": "For items marked reverse: true, use 8 minus the answer.",
    "sumRange": [3, 21],
    "scoreFormula": "round((sum - 3) / 18 * 100) gives that sin's score from 0 to 100."
  },
  "sins": [
    { "key": "pride", "name": "Pride", "code": "DEV-01" }
  ],
  "questions": [
    {
      "id": 1,
      "statement": "I am usually the most competent person in the room, even when nobody says so.",
      "sin": "pride",
      "reverse": false
    }
  ]
}
```

Answering 4 (neutral) on every statement gives 50 for every sin; the highest score is the dominant sin.

## Local development

```bash
npm install
npm test
```

The smoke test starts the server over stdio, lists its tools, calls `get_questions`, and checks that all 21 statements arrive with three per sin.

## License

MIT
