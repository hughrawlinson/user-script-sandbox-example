import { promisify } from "util";
import { exec } from "child_process";
import { readFile } from "fs/promises";
const execP = promisify(exec);

async function getUserCode() {
  const userCode = await readFile("example_user_code.txt", "utf8");
  return userCode.toString();
}

async function runUserCode(userCode) {
  const { stderr, stdout } = await execP(`node -r ./user-code-wrapper.js -e '${userCode}'`);
  if (stderr) {
    return {
      error: stderr,
    };
  }
  return {
    result: stdout.toString(),
  };
}

async function main() {
  const userCode = await getUserCode();
  const result = await runUserCode(userCode);
  console.log(result);
  return result;
}

await main();
