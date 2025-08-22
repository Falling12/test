import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload";

export const ASZF: GlobalConfig = {
    slug: 'aszf',
    label: 'ÁSZF',
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