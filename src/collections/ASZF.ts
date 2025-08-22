import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload";
import { revalidateAszf } from "@/lib/revalidation";

export const ASZF: GlobalConfig = {
    slug: 'aszf',
    label: 'ÁSZF',
    admin: {
        group: 'Tartalom',
    },
    hooks: {
        afterChange: [
            async ({ doc }) => {
                await revalidateAszf()
            }
        ]
    },
    fields: [
        {
            name: 'content',
            type: 'richText',
            localized: true,
            required: true,
            label: 'ÁSZF tartalom',
            editor: lexicalEditor({
                features({ defaultFeatures, rootFeatures }) {
                    return [
                        ...defaultFeatures,
                        FixedToolbarFeature({

                        })
                    ]
                }
            }),
        }
    ]
}