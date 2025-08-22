import { GlobalConfig } from "payload";

export const SubscriptionsFAQ: GlobalConfig = {
    slug: 'subscriptions-faq',
    label: 'Előfizetési FAQ',
    admin: {
        group: 'Tartalom',
    },
    fields: [
        {
            type: 'array',
            name: 'questions',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'question',
                            label: 'Kérdés'
                        },
                        {
                            type: 'text',
                            name: 'answer',
                            label: 'Válasz'
                        }
                    ]
                }
            ]
        }
    ]
}