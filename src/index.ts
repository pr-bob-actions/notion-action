import * as core from '@actions/core'
import { getLatestPR } from './github/getLatestPR'
import { actionInputs } from './github/actionInputs'
import { createPage } from './notion/createPage'
import { getLatestRelease } from './github/getLatestRelease'
import { getCommit } from './github/getCommitMessage'
import { logInfos } from './notion/logInfos'

const run = async () => {
    const { commitHash, repoOwner, repoName, accessToken, notionKey, notionPageId, databaseId } = actionInputs()

    try {
        const prURL = await getLatestPR({
            owner: repoOwner,
            repo: repoName,
            token: accessToken,
        })

        if (prURL === null) {
            core.setFailed(`Error get PR URL for hash ${commitHash}. Commit may not be created by merging a PR.`)
            return
        }

        const release = await getLatestRelease({
            owner: repoOwner,
            repo: repoName,
            token: accessToken,
        })

        const releaseVersion = release?.tag_name
        if (!releaseVersion) {
            core.setFailed(`Error get latest release for ${repoOwner}/${repoName}`)
            return
        }

        const commit = await getCommit({
            owner: repoOwner,
            repo: repoName,
            token: accessToken,
            version: releaseVersion,
        })

        const commitMessage = commit?.commit.message
        const commitDate = commit?.commit.author?.date
        if (!commitMessage || !commitDate) {
            core.setFailed('No commit message found, nor commit date')
            return
        }

        await createPage({
            notionKey,
            databaseId,
            pageId: notionPageId,
            releaseVersion,
            commitMessage,
            repoName,
            commitDate: new Date(commitDate),
        }).catch((error) => {
            core.setFailed(`Error updating Notion page ${notionPageId}: ${error}`)
        })
    } catch (error) {
        core.setFailed(`Error fetch PR description with hash ${commitHash}: ${error}`)
    }

    console.info(`Updated Notion page ${notionPageId}`)
}

run()
