import { Client } from '@notionhq/client'

export const findRelatedTasksEpics = async (notion: Client, pageId: string) => {
    const page = await notion.pages.retrieve({
        page_id: '3603',
    })

    return page?.id
}
