import * as core from "@actions/core";
import * as github from "@actions/github";

const labelToRemove = core.getInput("label-to-remove");

// looks like PRs are also treated as issues
const issue = github.context.issue;

async function run() {
  core.debug("init octokit");
  if (!process.env.GITHUB_TOKEN) {
    core.error(
      "Couldn't connect to GitHub, make sure the GITHUB_TOKEN secret is set"
    );
    return;
  }
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

  if (!octokit) {
    core.error(
      "Couldn't connect to GitHub, make sure the GITHUB_TOKEN is a valid token"
    );
    return;
  }

  core.info(`Removing ${labelToRemove}`);
  octokit.rest.issues.removeLabel({
    owner: issue.owner,
    repo: issue.repo,
    issue_number: issue.number,
    name: labelToRemove,
  });

  core.info("Action completed");
}

run();
