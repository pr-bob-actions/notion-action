import axios from 'axios'
import { Endpoints } from '@octokit/types'

import { getGitHubRequestHeaders } from './headers'
import { Octokit } from 'octokit'

export const pullRequestDescription = async (prURL: string, username: string, accessToken: string) => {
    const response = await axios.get(prURL, getGitHubRequestHeaders(username, accessToken))
    const { body } = response.data
    return body
}

export const getLatestPR = async (params: { owner: string; repo: string; token: string }) => {
    try {
        const octokit = new Octokit({
            auth: params.token,
        })

        const response = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
            owner: params.owner,
            repo: params.repo,
            state: 'closed',
            sort: 'updated',
            direction: 'desc',
            per_page: 1,
            page: 1,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })

        const pr = response.data[0]
        console.log('pull request infos')
        console.log(pr)
        return pr
    } catch (error) {
        console.error(error)
        return null
    }
}

export const pullRequestUrl = async (
    username: string,
    accessToken: string,
    repoOwner: string,
    repoName: string,
    commitHash: string,
) => {
    // const response = await axios.get(
    //     `https://api.github.com/search/issues?q=hash:${commitHash}`,
    //     getGitHubRequestHeaders(username, accessToken),
    // )
    try {
        console.log('start pullRequestUrl')
        const response = await axios.get(
            // `https://api.github.com/search/issues?q=type:issue`,
            // `https://api.github.com/search/issues?q=repo:The-AI-Institute-Bob/adaptive-learning-api+is:pull-request`,
            // `https://api.github.com/search/issues?q=repo:${repoOwner}/${repoName}+is:pull-request+state:closed+sort=updated+direction=desc`,
            `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=closed&sort=updated&direction=desc&per_page=1&page=1`,
            getGitHubRequestHeaders(username, accessToken),
        )
        const { items: issues } = response.data

        console.log('response', response.data)

        // console.log('issues', issues)

        if (issues === null || issues.length === 0) {
            console.log('did not find any issues for', repoOwner, repoName)
            return null
        }

        const prURLRegex = new RegExp(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls/[0-9]+`)
        const { pull_request } = issues.find((issue: any) => issue.pull_request.url.match(prURLRegex))
        const prs = issues.filter((issue: any) => issue.pull_request.url.match(prURLRegex))
        for (const pr of prs) {
            console.log('pr', pr)
        }
        console.log('found pull request', pull_request)
        return pull_request?.url
    } catch (error) {
        console.log('something failed here')
        console.error(error)
        console.error((error as any).response.data)
        return null
    }
}
