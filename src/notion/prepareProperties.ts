import { NotionStatus, NotionTypes, NotionTypesProperty, Release, ServiceName, services } from '../types'

export const prepareProperties = (params: {
    repoName: ServiceName
    commitMessage: string
    releaseVersion: string
    commitDate: Date
}) => {
    const { repoName, commitMessage, releaseVersion, commitDate } = params
    return {
        'Release': releaseVersion,
        'Service': prepareService(repoName),
        'Types': prepareTypes(commitMessage),
        'Release date': prepareDate(commitDate),
        'CreatedBy': prepareCreatedBy(),
        'Status': prepareStatus(),
        'Tasks': prepareTasks(commitMessage),
    }
}

const prepareService = (repoName: ServiceName) => {
    return services[repoName]
}

const prepareTypes = (commitMessage: string): NotionTypesProperty => {
    if (commitMessage.includes('hotfix')) {
        return { name: NotionTypes.HOT_FIX, color: 'brown' }
    }
    if (commitMessage.includes('fix')) {
        return { name: NotionTypes.BUG_FIX, color: 'green' }
    }
    if (commitMessage.includes('feat')) {
        return { name: NotionTypes.FEATURE, color: 'purple' }
    }
    return { name: NotionTypes.OTHER, color: 'default' }
}

const prepareDate = (date: Date) => {
    return date.toISOString()
}

const prepareCreatedBy = () => {}

const prepareStatus = () => {
    return {
        name: NotionStatus.NOT_DEPLOYED,
        color: 'gray',
    }
}

const prepareTasks = (commitMessage: string) => {
    // check if commitMessag string contains DEV-1234 (DEV-(4digit number))
    const taskID = commitMessage.match(/DEV-\d{4}/)
    if (!taskID) {
        return null
    }

    const taskElement = taskID[0]
    if (!taskElement) {
        return null
    }

    return taskElement
}
