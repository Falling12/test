import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
    slug: 'customers',
    labels: {
        singular: 'Ügyfél',
        plural: 'Ügyfelek'
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
            index: true,
        }
    ]
}