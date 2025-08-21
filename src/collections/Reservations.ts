import { CollectionConfig } from "payload";

export const Reservations: CollectionConfig = {
    slug: 'reservations',
    labels: {
        singular: 'Foglalás',
        plural: 'Foglalások'
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            label: 'E-mail cím',
        },
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Név',
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
            label: 'Telefonszám',
        },
        {
            name: 'car',
            type: 'relationship',
            relationTo: 'cars',
            required: true,
            label: 'Gépjármű',
        },
        {
            name: 'type',
            type: 'select',
            options: [
                {
                    label: 'Bérlés',
                    value: 'rental',
                },
                {
                    label: 'Lízing',
                    value: 'leasing',
                },
                {
                    label: 'Előfizetés',
                    value: 'subscription',
                }
            ],
            defaultValue: 'rental',
            required: true,
            label: 'Típus',
        },
        {
            name: 'subscription_type',
            label: 'Előfizetés típusa',
            type: 'select',
            options: [
                {
                    label: 'Negyedéves',
                    value: 'quarterly',
                },
                {
                    label: 'Féléves',
                    value: 'halfyearly',
                },
                {
                    label: 'Éves',
                    value: 'yearly',
                },
            ],
            required: false,
            admin: {
                condition: (data) => data.type === 'subscription',
            }
        },
        {
            name: 'leasing_price',
            label: 'Lízing díj',
            type: 'number',
            required: false,
            admin: {
                condition: (data) => data.type === 'leasing',
            }
        },
        {
            name: 'rental_price',
            label: 'Bérlési díj',
            type: 'number',
            required: false,
            admin: {
                condition: (data) => data.type === 'rental',
            }
        }
    ],
    access: {
        create: () => true,
        read: ({ req: { user } }) => {
            if (user) {
                return true
            }

            return false
        },
        update: ({ req: { user } }) => {
            if (user) {
                return true
            }

            return false
        },
        delete: ({ req: { user } }) => {
            if (user) {
                return true
            }

            return false
        }
    }
}