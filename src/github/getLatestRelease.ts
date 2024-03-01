import { Octokit } from 'octokit'
import { Endpoints } from '@octokit/types'

export type LatestReleaseParams = Endpoints['GET /repos/{owner}/{repo}/releases/latest']['parameters']
export type LatestReleaseResponse = Endpoints['GET /repos/{owner}/{repo}/releases/latest']['response']

export const getLatestRelease = async (params: { owner: string; repo: string; token: string }) => {
    try {
        const octokit = new Octokit({
            auth: params.token,
        })

        const release = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
            owner: params.owner,
            repo: params.repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })

        return release.data
    } catch (e) {
        console.error(e)
        return null
    }
}
