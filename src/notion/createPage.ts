import { Client } from '@notionhq/client'
import { prepareProperties } from './prepareProperties'
import { ColorValues, NotionStatus, ServiceName } from '../types'
import { findRelatedTasksEpics } from './findRelatedTasksEpics'

export const createPage = async (params: {
    notionKey: string
    databaseId: string
    pageId: string
    releaseVersion: string
    commitMessage: string
    commitDate: Date
    repoName: ServiceName
}) => {
    const { notionKey, commitMessage, releaseVersion, repoName, commitDate } = params
    const notion = new Client({ auth: notionKey })

    const props = prepareProperties({
        commitMessage,
        repoName,
        releaseVersion,
        commitDate,
    })

    const epicsProp: any = {
        'Tasks & Epics': {},
    }

    if (props.Tasks) {
        console.log('we had a props tasks', props.Tasks)
        const epics = await findRelatedTasksEpics(notion, props.Tasks)
        if (epics) {
            epicsProp['Tasks & Epics'] = {
                type: 'relation',
                value: epics,
            }
        } else {
            delete epicsProp['Tasks & Epics']
        }
    } else {
        delete epicsProp['Tasks & Epics']
    }

    await notion.pages.create({
        parent: {
            type: 'database_id',
            database_id: '4129ca728b824321955eecf2e4b2e3c1',
        },
        properties: {
            'Release': {
                type: 'title',
                title: [
                    {
                        type: 'text',
                        text: {
                            content: releaseVersion,
                        },
                    },
                ],
            },
            'Service': {
                type: 'select',
                select: {
                    ...props.Service,
                },
            },
            'Status': {
                type: 'select',
                select: {
                    name: NotionStatus.NOT_DEPLOYED,
                    color: ColorValues.GRAY,
                },
            },
            'Types': {
                type: 'multi_select',
                multi_select: [props.Types],
            },
            'Release date': {
                type: 'date',
                date: {
                    start: props['Release date'],
                },
            },
            ...epicsProp,
        },
    })
}
