const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const files = globSync("content/events/*.json");

const events = files.map(file => {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
});

fs.writeFileSync(
    "events.json",
    JSON.stringify(events, null, 2)
);

console.log(`Generated events.json with ${events.length} events`);