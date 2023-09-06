const { spawn } = require("child_process");

const command = "npm run both";
const args = [];

const child = spawn(command, args, {
  shell: true,
  stdio: "inherit",
});

child.on("exit", (code) => {
  // handle exit code
});