interface CLIArguments {
  [x: string]: unknown;
  r: string;
  repo: string;
  p: number | undefined;
  pr: number | undefined;
  _: string[];
  $0: string;
}

interface Repository {
  nameWithOwner: string;
  url: string;
  description: string;
}

interface RateLimit {
  cost: number;
  remaining: number;
}

interface Result {
  rateLimit: RateLimit;
}

interface GetRepositoryResult extends Result {
  repository: Repository;
}

export { CLIArguments, Repository, RateLimit, Result, GetRepositoryResult };
