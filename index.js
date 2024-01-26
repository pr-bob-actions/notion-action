"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require("axios");
const btoa = require("btoa");
const core = require("@actions/core");
const github = require("@actions/github");
const { Client } = require("@notionhq/client");
const getGitHubRequestHeaders = (username, accessToken) => ({
    headers: { Authorization: `Basic ${btoa(`${username}:${accessToken}`)}` },
});
const updateNotionStory = (notionKey, notionPageId) => __awaiter(void 0, void 0, void 0, function* () {
    const notion = new Client({ auth: notionKey });
    yield notion.pages.update({
        page_id: notionPageId,
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
});
const fetchPRDescription = (prURL, username, accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(prURL, getGitHubRequestHeaders(username, accessToken));
    const { body } = response.data;
    return body;
});
const fetchPRURL = (commitHash, username, accessToken, repoOwner, repoName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`https://api.github.com/search/issues?q=hash:${commitHash}`, getGitHubRequestHeaders(username, accessToken));
    const { items: issues } = response.data;
    if (issues === null || issues.length === 0) {
        return null;
    }
    const prURLRegex = new RegExp(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls/[0-9]+`);
    const { pull_request } = issues.find((issue) => issue.pull_request.url.match(prURLRegex));
    return pull_request.url;
});
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
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const { commitHash, repoOwner, repoName, username, accessToken, notionKey, notionPageId, } = getActionInputs();
    let prDescription = "";
    try {
        const prURL = yield fetchPRURL(commitHash, username, accessToken, repoOwner, repoName);
        if (prURL === null) {
            core.setFailed(`Error get PR URL for hash ${commitHash}. Commit may not be created by merging a PR.`);
        }
        prDescription = yield fetchPRDescription(prURL, username, accessToken);
    }
    catch (error) {
        core.setFailed(`Error fetch PR description with hash ${commitHash}: ${error}`);
    }
    try {
        yield updateNotionStory(notionKey, notionPageId);
    }
    catch (error) {
        core.setFailed(`Error updating Notion page ${notionPageId}: ${error}`);
    }
    console.info(`Updated Notion page ${notionPageId}`);
});
run();
