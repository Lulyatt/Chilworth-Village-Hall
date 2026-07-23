const fs = require("fs");
const { globSync } = require("glob");

const files = globSync("content/users/*.json");

const users = files.map(file => {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
});

fs.writeFileSync(
    "users.json",
    JSON.stringify(users, null, 2)
);

console.log(`Generated users.json with ${users.length} users`);