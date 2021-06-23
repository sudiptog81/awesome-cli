import chalk from "chalk";
import boxen from "boxen";
import dedent from "ts-dedent";
import { graphql } from "@octokit/graphql";
import { Repository, RateLimit, GetRepositoryResult } from "./types";

const getRepository = async (
  owner: string,
  repo: string,
  token: string
): Promise<GetRepositoryResult> => {
  const { repository, rateLimit }: GetRepositoryResult = await graphql(
    `
      {
        repository(owner: "${owner}", name: "${repo}") {
          nameWithOwner
          url
        }
        rateLimit {
          cost
          remaining
        }
      }
    `,
    {
      headers: {
        authorization: `token ${token}`,
      },
    }
  );

  return { repository, rateLimit };
};

const putRepositoryDetails = (
  repository: Repository,
  rateLimit: RateLimit
): void => {
  console.log();
  console.log(
    boxen(
      dedent`
    ${chalk.green(repository.nameWithOwner)}
    ${chalk.green(repository.url)}
    ${chalk.blue(
      `API Cost: ${rateLimit.cost} (${rateLimit.remaining} Remaining)`
    )}
    `,
      { padding: 1, margin: 1, borderStyle: "double", align: "center" }
    )
  );
};

export { getRepository, putRepositoryDetails };
