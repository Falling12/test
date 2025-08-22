import { GlobalConfig } from "payload";

export const About: GlobalConfig = {
    slug: 'about',
    label: 'Rólunk',
    admin: {
        group: 'Tartalom',
    },
    fields: [
        {
            type: 'textarea',
            name: 'content',
            label: 'Leírás',
            required: false,
        }
    ]
}