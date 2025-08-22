import { RichTextRenderer } from '@/components/ui/richtextrenderer'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import React from 'react'

const getAszfContent = async () => {
    try {
        const payload = await getPayload({
            config: payloadConfig
        })

        const aszfContent = await payload.findGlobal({
            slug: 'aszf'
        })

        return aszfContent.content
    } catch (error) {
        console.error(error)
    }
}

export default async function ASZFPage() {
    const aszfContent = await getAszfContent()

    return (
        <div className='px-[15%] py-8 max-[1400px]:px-[10%] max-[768px]:px-[3%]'>
            {
                aszfContent && (
                    <RichTextRenderer data={aszfContent} />
                )
            }
        </div>
    )
}
