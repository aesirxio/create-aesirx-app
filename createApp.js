"use strict";

const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");
const fs = require("fs-extra");
const spawn = require("cross-spawn");

async function createApp(res) {
  const root = path.resolve(res.path);

  console.log();

  console.log(
    `Creating a new ${chalk.green(res.app)} app in ${chalk.green(root)}.`
  );

  console.log();

  switch (res.app) {
    case "AesirX DMA":
      execSync(
        `git clone -b master https://github.com/aesirxio/dma-app ${res.path}`,
        {
          stdio: "ignore",
        }
      );
      break;

    case "AesirX DAM":
      execSync(
        `git clone -b master https://github.com/aesirxio/dam-app ${res.path}`,
        {
          stdio: "ignore",
        }
      );
      break;

    default:
      break;
  }

  const env = `REACT_APP_CLIENT_ID=app
REACT_APP_CLIENT_SECRET=${res.client_secret}
REACT_APP_ENDPOINT_URL=https://api.aesirx.io
REACT_APP_WEBSOCKET_ENDPOINT=https://ws.r.redweb.digital
REACT_APP_ENCRYPT=encrypt
REACT_APP_LICENSE=${res.license}
REACT_APP_TEST_MODE=${res.test}`;

  fs.writeFileSync(path.join(root, ".env"), env);

  process.chdir(root);

  const command = "npm";
  const args = [
    "install",
    "--no-audit",
    "--save",
    "--save-exact",
    "--loglevel",
    "error",
  ];

  const child = spawn(command, args, { stdio: "inherit" });

  child.on("close", () => {
    console.log(
      `cd ${chalk.green(res.path)} and ${chalk.green(`npm run start`)}`
    );

    process.exit(1);
  });

  console.log();
}

module.exports = createApp;
