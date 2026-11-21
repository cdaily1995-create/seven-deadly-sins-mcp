# Seven Deadly Sins MCP

An MCP server for the [7 Deadly Sins Test](https://7deadlysinstest.info/) — a free personality test that scores you on all seven deadly sins at once. This server hands an AI assistant the full question set so it can run the test in chat: 21 statements, three per sin, answered on a 7-point scale and scored 0–100 for Pride, Greed, Lust, Envy, Gluttony, Wrath and Sloth.

The test itself lives at **[7deadlysinstest.info](https://7deadlysinstest.info/)**, where the result is drawn as a radar chart with a case-file stamp and a compare link for friends. More about it on the [About page](https://7deadlysinstest.info/about).

## The tool

| Tool | Returns |
| --- | --- |
| `get_questions` | The 21 statements, the sin each one scores, which seven are reverse-scored, the 1–7 answer scale, and the formula that turns answers into a 0–100 score for every sin. |

With the questions in context, an assistant can walk someone through the [7 Deadly Sins Test](https://7deadlysinstest.info/) one statement at a time, then compute all seven scores and name the dominant sin.

## The seven sins it scores

Each sin gets three statements and its own 0–100 score. The links go to the full write-up for each sin on the test site.

| Sin | File code | In one line | Read more |
| --- | --- | --- | --- |
| Pride | DEV-01 | An inflated sense of your own rank. | [Pride sin](https://7deadlysinstest.info/sins/pride) |
| Greed | DEV-02 | Wanting more than you need, and keeping score. | [Greed sin](https://7deadlysinstest.info/sins/greed) |
| Lust | DEV-03 | A craving for spark, novelty and attention. | [Lust sin](https://7deadlysinstest.info/sins/lust) |
| Envy | DEV-04 | Measuring your life against everyone else's. | [Envy sin](https://7deadlysinstest.info/sins/envy) |
| Gluttony | DEV-05 | Consuming well past the point of enough. | [Gluttony sin](https://7deadlysinstest.info/sins/gluttony) |
| Wrath | DEV-06 | A short fuse and the urge to hit back. | [Wrath sin](https://7deadlysinstest.info/sins/wrath) |
| Sloth | DEV-07 | Avoiding effort you know you should make. | [Sloth sin](https://7deadlysinstest.info/sins/sloth) |

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

`get_questions` takes no arguments and returns JSON:

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

Three statements belong to each sin, and one of the three is reverse-scored so that agreeing with everything does not inflate a score. Answering 4 (neutral) on every statement gives 50 for every sin; the highest score is the dominant sin. The site explains [how the scoring works](https://7deadlysinstest.info/) in full.

## How to read the scores

| Score | Band | Meaning |
| --- | --- | --- |
| 85–100 | High risk | A defining trait. Friends have probably noticed. |
| 60–84 | Observation required | A clear tendency that shows up in daily life. |
| 40–59 | Borderline | Mild leanings; your seven scores are fairly balanced. |
| Below 40 | Latent | No sin stands out. |

The band of your top sin decides which of four stamps your result gets. Take the [7 Deadly Sins Test](https://7deadlysinstest.info/) to see your own chart and stamp.

## Local development

```bash
npm install
npm test
```

The smoke test starts the server over stdio, lists its tools, calls `get_questions`, and checks that all 21 statements arrive with three per sin.

## Links

- Test: [7deadlysinstest.info](https://7deadlysinstest.info/)
- About & contact: [7deadlysinstest.info/about](https://7deadlysinstest.info/about)
- npm: [seven-deadly-sins-mcp](https://www.npmjs.com/package/seven-deadly-sins-mcp)

## License

MIT
