import axios from "axios";
import btoa from "btoa";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { Client } from "@notionhq/client";


const getGitHubRequestHeaders = (username: string, accessToken: string) => ({
  headers: { Authorization: `Basic ${btoa(`${username}:${accessToken}`)}` },
});

const updateNotionStory = async (
  notionKey: string,
  notionPageId: string,
) => 
{
  const notion = new Client({ auth: notionKey });
  await notion.blocks.children.append({
    block_id: notionPageId,
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
            rich_text: [
                {
                    type: "text",
                    text: {
                        content: "Hello world",
                    },
                },
            ],
        }
    },
    ]
  })
  await notion.pages.update({
    page_id: notionPageId,

    // @ts-expect-error
    children: [
        {
            object: "block",
            type: "paragraph",
            paragraph: {
                "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
            }
        },
    ]
  });
};

const fetchPRDescription = async (prURL: string, username: string, accessToken: string) => {
  const response = await axios.get(
    prURL,
    getGitHubRequestHeaders(username, accessToken)
  );
  const { body } = response.data;
  return body;
};

const fetchPRURL = async (
  commitHash: string,
  username: string,
  accessToken: string,
  repoOwner: string,
  repoName: string,
) => {
  const response = await axios.get(
    `https://api.github.com/search/issues?q=hash:${commitHash}`,
    getGitHubRequestHeaders(username, accessToken)
  );
  const { items: issues } = response.data;

  if (issues === null || issues.length === 0) {
    return null;
  }

  const prURLRegex = new RegExp(
    `https://api.github.com/repos/${repoOwner}/${repoName}/pulls/[0-9]+`
  );
  const { pull_request } = issues.find((issue: any) =>
    issue.pull_request.url.match(prURLRegex)
  );
  return pull_request.url;
};

const getActionInputs = () => {
  return {
    commitHash: github.context.sha,
    repoOwner: github.context.repo.owner,
    repoName: github.context.repo.repo,
    username: core.getInput("gh-username"),
    accessToken: core.getInput("gh-token"),
    notionKey: core.getInput("notion-key"),
    notionPageId: core.getInput("notion-page-id"),
  };
};

const run = async () => {
  const {
    commitHash,
    repoOwner,
    repoName,
    username,
    accessToken,
    notionKey,
    notionPageId,
  } = getActionInputs();

  let prDescription = "";
  try {
    const prURL = await fetchPRURL(
      commitHash,
      username,
      accessToken,
      repoOwner,
      repoName
    );

    if (prURL === null) {
      core.setFailed(
        `Error get PR URL for hash ${commitHash}. Commit may not be created by merging a PR.`
      );
    }

    prDescription = await fetchPRDescription(prURL, username, accessToken);
  } catch (error) {
    core.setFailed(
      `Error fetch PR description with hash ${commitHash}: ${error}`
    );
  }

  try {
    await updateNotionStory(
      notionKey,
      notionPageId,
    );
  } catch (error) {
    core.setFailed(`Error updating Notion page ${notionPageId}: ${error}`);
  }

  console.info(
    `Updated Notion page ${notionPageId}`
  );
};

run();