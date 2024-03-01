import * as core from '@actions/core'
import * as github from '@actions/github'

export const actionInputs = () => {
    if (!github?.context?.sha) {
        return {
            commitHash: 'commitHash',
            repoOwner: 'The-AI-Institute-Bob',
            repoName: 'adaptive-learning-api',
            username: 'rachid-debu-prbob',
            accessToken:
                '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',
            notionKey: 'secret_yLZavb1duxdEJMKZc9jw31jc5Fb0BfHiICXRa0h5ZbI',
            notionPageId: 'ecaa8f57-70ec-445b-8568-d9eb0ffd60fe',
            databaseId: '4129ca728b824321955eecf2e4b2e3c1',

            // e523da708d8a42beb6dad78e4670a438
            // notionPageId: 'e523da70-8d8a-42be-b6da-d78e4670a438',

            // notionPageId: 'b5b68b07-4770-497f-8f25-36d407194a4e',
            // notionPageId: '4129ca72-8b82-4321-955e-ecf2e4b2e3c1',
            // notionPageId: '74b0c29a-776e-4a10-a572-0479d9f9d7a1',

            // notionPageId: '278e6b7f-8367-4731-b6fe-a8cf9335b252',
        }
    }
    console.log('we do have a github context', github.context)
    return {
        commitHash: github.context.sha,
        repoOwner: github.context.repo.owner,
        repoName: github.context.repo.repo,
        username: core.getInput('gh-username'),
        accessToken: core.getInput('gh-token'),
        notionKey: core.getInput('notion-key'),
        notionPageId: core.getInput('notion-page-id'),
        databaseId: core.getInput('notion-database-id'),
    }
}
