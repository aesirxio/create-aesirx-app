#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const prompts = require("prompts");

const createApp = require("./createApp");
const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

if (major < 14) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create AesirX App requires Node 14 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
}

async function run() {
  const res = await prompts([
    {
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-app",
    },
    {
      type: "select",
      name: "app",
      message: "What Aesix App do you want?",
      choices: [{ title: "AesirX DMA", value: "AesirX DMA" }],
      initial: 0,
    },
    {
      type: "text",
      name: "client_secret",
      message: "What is your REACT_APP_CLIENT_SECRET?",
    },
    {
      type: "text",
      name: "license",
      message: "What is your REACT_APP_LICENSE?",
    },
    {
      type: "select",
      name: "test",
      message: "Is it test mode?",
      choices: [
        { title: "Yes", value: "true" },
        { title: "No", value: "false" },
      ],
      initial: 1,
    },
  ]);

  try {
    await createApp(res);
  } catch (reason) {
    throw reason;
  }
}

run().catch(async (reason) => {
  console.log();
  console.log("Aborting installation.");
  if (reason.command) {
    console.log(`  ${chalk.cyan(reason.command)} has failed.`);
  } else {
    console.log(
      chalk.red("Unexpected error. Please report it as a bug:") + "\n",
      reason
    );
  }
  console.log();

  process.exit(1);
});
