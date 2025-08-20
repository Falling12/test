import { Media } from "@/payload-types"
import payloadConfig from "@/payload.config"
import { getPayload } from "payload"

export async function getImageUrl(image: number | Media | null | undefined): Promise<string> {
    try {
        if (!image) return '/placeholder.png'

        if (typeof image === 'number') {
            const payload = await getPayload({
                config: payloadConfig
            })
            const imageObject = await payload.find({
                collection: 'media',
                where: {
                    id: {
                        equals: image
                    }
                }
            })
            return imageObject?.docs?.[0]?.url ?? '/placeholder.png'
        }

        return image.url ?? '/placeholder.png'
    } catch (error) {
        console.error(error)
        return '/placeholder.png'
    }
}

export function getImageAlt(image: number | Media | null | undefined): string {
    if (image && typeof image === 'object') {
        return image.alt ?? 'Image'
    }
    return 'Image'
}
