#!/usr/bin/env node

import yargs from "yargs";
import readLine from "readline";

import { getRepository, putRepositoryDetails } from "./util";
import { CLIArguments, GetRepositoryResult } from "./types";

(async () => {
  let token: string = process.env.GITHUB_TOKEN || "";

  const argv = await yargs.usage("Usage: -r <repo>").option("r", {
    alias: "repo",
    describe: "repository",
    type: "string",
    demandOption: true,
  }).argv;

  const [owner, repo]: string[] = (argv as CLIArguments).repo.split("/");

  if (!token) {
    const rl: readLine.Interface = readLine.createInterface(
      process.stdin,
      process.stdout
    );

    token = (await new Promise((resolve) => {
      rl.question("Enter GitHub Token: ", resolve);
    })) as string;

    rl.close();
  }

  const { repository, rateLimit }: GetRepositoryResult = await getRepository(
    owner,
    repo,
    token
  );
  putRepositoryDetails(repository, rateLimit);
})();
