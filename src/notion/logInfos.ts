import { Client } from '@notionhq/client'

export const logInfos = async (params: { notionKey: string; databaseId: string; pageId: string; repoName: string }) => {
    const { notionKey, databaseId } = params
    const notion = new Client({ auth: notionKey })
    // const page = await notion.pages.retrieve({ page_id: notionPageId })
    // console.log('we do have a page ', page)

    // const pageAsQuery = await notion.databases.query({
    //     database_id: databaseId,
    // })

    const dbinfos = await notion.databases.retrieve({ database_id: databaseId })
    // console.log('we do have a dbinfos ', dbinfos)
    const propsdb = dbinfos.properties
    for (const [key, value] of Object.entries(propsdb)) {
        console.log(`${key} has value : `, value)
        // switch (value.type) {
        //     case 'select': {
        //         console.log('we do have a select ', value.select)
        //         break
        //     }
        //     case 'multi_select': {
        //         console.log('we do have a multi_select ', value.multi_select)
        //         break
        //     }
        //     case 'date': {
        //         console.log('we do have a date ', value.date)
        //         break
        //     }
        //     case 'relation': {
        //         console.log('we do have a relation ', value.relation)
        //         break
        //     }
        //     case 'created_by': {
        //         console.log('we do have a created_by ', value.created_by)
        //         break
        //     }
        //     case 'rollup': {
        //         console.log('we do have a rollup ', value.rollup)
        //         break
        //     }
        // }
        // @ts-expect-error
        const options = value[value.type].options
        console.log('we do have a options ', options)
    }

    // https://www.notion.so/stellia-ai/v3-10-0-74b0c29a776e4a10a5720479d9f9d7a1?pvs=4

    // const gogy = await notion.pages.properties.retrieve({
    //     page_id: '74b0c29a776e4a10a5720479d9f9d7a1',
    //     property_id: 'gogy',
    // })

    // console.log('we do have a gogy ', gogy)

    // console.log('result:', pageAsQuery)
    // console.log('we do have a pageAsQuery ', pageAsQuery)
    // const results = pageAsQuery.results
    // const firstElement = results[0] as any
    // for (const [key, value] of Object.entries(firstElement.properties)) {
    //     console.log(`${key} has value : `, value)
    // }
    // for (const result of results) {
    //     console.log('we do have a result ', (result as any).properties)
    //     for (const [key, value] of Object.entries((result as any).properties)) {
    //         console.log(`${key} has value : `, value)
    //     }
    // }

    // await notion.pages.create({
    //     parent: {
    //         type: 'database_id',
    //         database_id: '4129ca728b824321955eecf2e4b2e3c1',
    //     },
    //     properties: {
    //         'Service': {
    //             select: { name: 'bob-qa', color: 'orange' },
    //         },
    //         'Release date': {
    //             date: { start: '2024-02-27' },
    //         },
    //         // Types: {
    //         //   id: 'NjDL',
    //         //   type: 'multi_select',
    //         //   multi_select: [ [Object], [Object] ]
    //         // },
    //         // 'Release date': {
    //         //   id: 'PONr',
    //         //   type: 'date',
    //         //   date: { start: '2023-10-25', end: null, time_zone: null }
    //         // },
    //         // 'Tasks & Epics': { id: 'Pc%7Bb', type: 'relation', relation: [], has_more: false },
    //         // 'Créée par': {
    //         //   id: 'U%60ul',
    //         //   type: 'created_by',
    //         //   created_by: { object: 'user', id: '4894d724-7ec7-4d61-9a65-8dfa51c8348e' }
    //         // },
    //         // 'Contributors (automatic)': {
    //         //   id: '%60DPw',
    //         //   type: 'rollup',
    //         //   rollup: { type: 'array', array: [], function: 'show_original' }
    //         // },
    //         // Status: {
    //         //   id: 'nqlf',
    //         //   type: 'select',
    //         //   select: {
    //         //     id: 'f1570a6d-3168-47e0-b41d-136e9edf025c',
    //         //     name: 'On Prod',
    //         //     color: 'green'
    //         //   }
    //         // },
    //         // Release: { id: 'title', type: 'title', title: [ [Object] ] }
    //     },
    // })

    // const db = await notion.databases.retrieve({ database_id: '278e6b7f-8367-4731-b6fe-a8cf9335b252' })

    // const release = await notion.search({
    //     query: 'Release',
    //     filter: {
    //         value: 'page',
    //         property: 'object',
    //     },
    // })

    // console.log('we do have a release ', release)

    // const db = await notion.databases.retrieve({ database_id: notionPageId })
    // console.log('we do have a db ', db)
    // for (const element of (db as any).description) {
    //     console.log('we do have a element ', element)
    // }

    // const block = await notion.blocks.retrieve({ block_id: notionPageId })
    // console.log('we do have a block ', block)

    // const children = await notion.blocks.children.list({ block_id: notionPageId })
    // for (const child of children.results) {
    //     if ('paragraph' in child) {
    //         console.log('we do have a paragraph ', child.id, child.paragraph)
    //         console.log(child)
    //     } else if ('child_database' in child) {
    //         console.log('we do have a child_database ', child.id, child.child_database)
    //         console.log(child)

    //         // const dbAsBlock = await notion.blocks.children.list({ block_id: child.id })
    //         // const dbAsBlockAsList = await notion.blocks.retrieve({ block_id: child.id })
    //         // console.log('we do have a dbAsBlock ', dbAsBlock)
    //         // console.log('we do have a dbAsBlockAsList ', dbAsBlockAsList)

    //         const query = await notion.databases.query({
    //             database_id: child.id,
    //         })
    //         console.log('we do have a query ', query)
    //         // const db = await notion.databases.retrieve({ database_id: child.id })
    //         // console.log('we do have a db ', db)
    //         // for (const element of (db as any).description) {
    //         //     console.log('we do have a element ', element)
    //         // }
    //     } else {
    //         console.log('we do have a generic child ', child.id)
    //         console.log(child)
    //     }
    // }

    // const others = await notion.blocks.children.list({ block_id: '4129ca72-8b82-4321-955e-ecf2e4b2e3c1' })
    // console.log('others', others)
    // for (const other of others.results) {
    //     console.log('we do have a other ', other)
    // }

    // console.log('we do have a children ', children)
    // console.log('we do have a release ', release)
    // await notion.blocks.children.append({
    //     block_id: notionPageId,
    //     children: [
    //         {
    //             object: 'block',
    //             type: 'paragraph',
    //             paragraph: {
    //                 rich_text: [
    //                     {
    //                         type: 'text',
    //                         text: {
    //                             content: 'Hello world',
    //                         },
    //                     },
    //                 ],
    //             },
    //         },
    //     ],
    // })
    // await notion.blocks.update({
    //     page_id: notionPageId,

    //     children: [
    //         {
    //             object: 'block',
    //             type: 'paragraph',
    //             paragraph: {
    //                 text: [
    //                     {
    //                         type: 'text',
    //                         text: {
    //                             content: '– Notion API Team',
    //                             link: { type: 'url', url: 'https://twitter.com/NotionAPI' },
    //                         },
    //                     },
    //                 ],
    //             },
    //         },
    //     ],
    // })
}
