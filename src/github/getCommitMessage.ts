import { Octokit } from 'octokit'

export const getCommit = async (params: { owner: string; repo: string; token: string; version: string }) => {
    try {
        const octokit = new Octokit({
            auth: params.token,
        })

        const response = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner: params.owner,
            repo: params.repo,
            ref: 'tags/' + params.version,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })

        const commit = response.data
        // console.log('commit', commit)
        return commit
    } catch (error) {
        console.error(error)
        return null
    }
}
