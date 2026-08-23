const dotenv = require("dotenv");
const { spawn } = require("child_process");

const appEnv = process.env.APP_ENV || "dev";
debugger;
dotenv.config({
  path: `.env.${appEnv}`,
});

console.log(`Running Next.js with APP_ENV=${appEnv}`);

const command = process.argv[2];
const args = process.argv.slice(3);

const child = spawn(command, args, {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    APP_ENV: appEnv,
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});