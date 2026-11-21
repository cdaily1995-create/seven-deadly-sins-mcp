#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const TEST_URL = "https://7deadlysinstest.info/";

const SINS = [
  { key: "pride", name: "Pride", code: "DEV-01" },
  { key: "greed", name: "Greed", code: "DEV-02" },
  { key: "lust", name: "Lust", code: "DEV-03" },
  { key: "envy", name: "Envy", code: "DEV-04" },
  { key: "gluttony", name: "Gluttony", code: "DEV-05" },
  { key: "wrath", name: "Wrath", code: "DEV-06" },
  { key: "sloth", name: "Sloth", code: "DEV-07" }
];

const QUESTIONS = [
  ["I am usually the most competent person in the room, even when nobody says so.", "pride", false],
  ["Faced with a long to-do list, doing nothing feels like the most efficient option.", "sloth", false],
  ["When an average colleague gets rewarded more than me, I feel physically uncomfortable.", "envy", false],
  ["I keep things I will never use, just in case they become valuable.", "greed", false],
  ["I replay arguments in my head long after they are over, and I win every time.", "wrath", false],
  ["I keep eating, watching or scrolling long after I have stopped enjoying it.", "gluttony", false],
  ["Ordinary days bore me unless there is some spark, flirting or thrill involved.", "lust", false],
  ["Admitting I was wrong in front of other people feels physically uncomfortable.", "pride", false],
  ["I have snoozed an alarm more than twice this week.", "sloth", false],
  ["I check how my results compare with other people's before I enjoy them myself.", "envy", false],
  ["No matter how much I earn, the number never quite feels like enough.", "greed", false],
  ["Small delays, like slow walkers or loading screens, make my pulse rise.", "wrath", false],
  ['"One more episode" or "one more snack" is a promise I rarely keep.', "gluttony", false],
  ["I have stayed up far too late chasing a conversation that excited me.", "lust", false],
  ["I finish tasks long before they are due.", "sloth", true],
  ["I am genuinely happy to let other people take credit for shared work.", "pride", true],
  ["I stop eating as soon as I am no longer hungry.", "gluttony", true],
  ["A friend's big success makes me purely happy, with no comparison at all.", "envy", true],
  ["Romance and attraction rarely cross my mind during a normal day.", "lust", true],
  ["When someone insults me, I can let it go within the hour.", "wrath", true],
  ["I lend money to friends without keeping track of who owes me what.", "greed", true]
];

const PAYLOAD = {
  test: "7 Deadly Sins Test",
  site: TEST_URL,
  questionCount: QUESTIONS.length,
  scale: {
    min: 1,
    max: 7,
    labels: {
      "1": "strongly disagree",
      "4": "neutral",
      "7": "strongly agree"
    },
    note: "Whole numbers only: 1 strongly disagree, 2, 3, 4 neutral, 5, 6, 7 strongly agree."
  },
  scoring: {
    statementsPerSin: 3,
    reverseRule: "For items marked reverse: true, use 8 minus the answer.",
    sumRange: [3, 21],
    scoreFormula: "round((sum - 3) / 18 * 100) gives that sin's score from 0 to 100.",
    note: "Answering 4 (neutral) on every statement gives 50 for every sin. The highest score is the dominant sin."
  },
  sins: SINS,
  questions: QUESTIONS.map(([statement, sin, reverse], i) => ({
    id: i + 1,
    statement,
    sin,
    reverse
  }))
};

const server = new McpServer({
  name: "seven-deadly-sins-test",
  version: "0.1.0"
});

server.registerTool(
  "get_questions",
  {
    title: "Get the 7 Deadly Sins Test questions",
    description:
      "Returns the 21 statements of the 7 Deadly Sins Test: each statement, the sin it scores, whether it is reverse-scored, the 7-point answer scale, and the formula that turns answers into 0-100 scores for all seven sins.",
    inputSchema: {}
  },
  async () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify(PAYLOAD, null, 2)
      }
    ]
  })
);

await server.connect(new StdioServerTransport());
console.error("seven-deadly-sins-mcp running on stdio");
