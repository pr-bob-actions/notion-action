export const getGitHubRequestHeaders = (username: string, accessToken: string) => ({
    headers: { Authorization: `Basic ${btoa(`${username}:${accessToken}`)}` },
})
