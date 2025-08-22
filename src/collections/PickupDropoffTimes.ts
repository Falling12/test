import { GlobalConfig } from "payload";

export const PickupDropoffTimes: GlobalConfig = {
    slug: 'pickup-dropoff-times',
    label: 'Átvételi/Leadási időpontok',
    admin: {
        group: 'Tartalom',
    },
    fields: [
        {
            type: 'array',
            name: 'pickup_times',
            label: 'Átvételi időpontok',
            labels: { singular: 'Időpont', plural: 'Időpontok' },
            fields: [
                {
                    type: 'text',
                    name: 'time',
                    label: 'Idő (HH:MM)',
                }
            ]
        },
        {
            type: 'array',
            name: 'dropoff_times',
            label: 'Leadási időpontok',
            labels: { singular: 'Időpont', plural: 'Időpontok' },
            fields: [
                {
                    type: 'text',
                    name: 'time',
                    label: 'Idő (HH:MM)',
                }
            ]
        },
        {
            type: 'text',
            name: 'pickup_warning_before_or_at',
            label: 'Átvételi figyelmeztetés küszöb (óra, pl. 12)',
            required: false,
        },
        {
            type: 'text',
            name: 'pickup_warning_message',
            label: 'Átvételi figyelmeztetés szöveg',
            required: false,
        },
        {
            type: 'text',
            name: 'dropoff_warning_after_or_at',
            label: 'Leadási figyelmeztetés küszöb (óra, pl. 14)',
            required: false,
        },
        {
            type: 'text',
            name: 'dropoff_warning_message',
            label: 'Leadási figyelmeztetés szöveg',
            required: false,
        }
    ]
}