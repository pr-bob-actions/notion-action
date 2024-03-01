import { getCommit } from './github/getCommitMessage'
import { getLatestRelease } from './github/getLatestRelease'
import { prepareProperties } from './notion/prepareProperties'

export type Commit = Awaited<ReturnType<typeof getCommit>>
export type Release = Awaited<ReturnType<typeof getLatestRelease>>
export type PreparedProperties = Awaited<ReturnType<typeof prepareProperties>>
export type SelectColor =
    | 'default'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
export enum ColorValues {
    DEFAULT = 'default',
    GRAY = 'gray',
    BROWN = 'brown',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
    PINK = 'pink',
    RED = 'red',
}
export enum NotionTypes {
    BUG_FIX = 'Bug fix',
    HOT_FIX = 'Hot fix',
    FEATURE = 'Feature',
    OTHER = 'Other',
}
export interface NotionTypesProperty {
    color: SelectColor
    name: NotionTypes
}
export enum NotionStatus {
    NOT_DEPLOYED = 'Not deployed',
    ON_DEV = 'On Dev',
    ON_STAGING = 'On Staging',
    ON_PROD = 'On Prod',
}

export type ServiceName = keyof typeof services
export const services: Record<
    string,
    {
        name: string
        color: SelectColor
    }
> = {
    'bob-qa': {
        name: 'bob-qa',
        color: 'orange',
    },
    'bob-api': {
        name: 'bob-api',
        color: 'gray',
    },
    'bob-4': {
        name: 'bob-4',
        color: 'purple',
    },
    'bob-back-office-frontend': {
        name: 'backoffice',
        color: 'blue',
    },
    'prb-components': {
        name: 'prb-components',
        color: 'red',
    },
    'adaptive-learning-api': {
        name: 'adaptive-learning-api',
        color: 'yellow',
    },
    'assistant-external-release': {
        name: 'assistant-external-release',
        color: 'brown',
    },
    'dashboard': {
        name: 'dashboard',
        color: 'default',
    },
    'resource-player': {
        name: 'resource-player',
        color: 'default',
    },
    'lti-adaptive-learning': {
        name: 'lti-adaptive-learning',
        color: 'default',
    },
    'sequelize-models-bob': {
        name: 'sequelize-models-bob',
        color: 'pink',
    },
    'database-migrations': {
        name: 'database-migrations',
        color: 'pink',
    },
    'data-converter': {
        name: 'data-converter',
        color: 'pink',
    },
    'data-importer': {
        name: 'data-importer',
        color: 'pink',
    },
}
