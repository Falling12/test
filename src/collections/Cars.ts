import { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
    slug: 'cars',
    labels: {
        singular: 'Gépjármű',
        plural: 'Gépjárművek',
    },
    admin: {
        group: 'Adminisztráció',
        useAsTitle: 'model',
        defaultColumns: ['car_details.manufacturer', 'car_details.model', 'car_details.year', 'car_details.kilometers'],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'car_details',
                    label: 'Gépjármű adatai',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    type: 'text',
                                    name: 'manufacturer',
                                    label: 'Gyártó',
                                    required: true,
                                },
                                {
                                    type: 'text',
                                    name: 'model',
                                    label: 'Modell',
                                    required: true,
                                },
                                {
                                    type: 'text',
                                    name: 'additional_info',
                                    label: 'Kiegészítő szöveg',
                                    required: false,
                                },
                            ]
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    type: 'select',
                                    name: 'design',
                                    label: 'Kivitel',
                                    required: false,
                                    options: [
                                        {
                                            label: 'Szedán',
                                            value: 'sedan',
                                        },
                                        {
                                            label: 'Ferdehátú',
                                            value: 'hatchback',
                                        },
                                        {
                                            label: 'SUV',
                                            value: 'suv',
                                        },
                                        {
                                            label: 'Kupé',
                                            value: 'coupe',
                                        },
                                        {
                                            label: 'Kabrió',
                                            value: 'convertible',
                                        },
                                        {
                                            label: 'Sportautó',
                                            value: 'sports_car',
                                        },
                                        {
                                            label: 'Elektromos',
                                            value: 'electric',
                                        },
                                        {
                                            label: 'Hibrid',
                                            value: 'hybrid',
                                        },
                                        {
                                            label: 'Egyéb',
                                            value: 'other',
                                        },
                                    ],
                                },
                                {
                                    type: 'number',
                                    name: 'year',
                                    label: 'Évjárat',
                                    required: true,
                                    min: 1900,
                                    max: 2025,
                                },
                                {
                                    type: 'number',
                                    name: 'seats',
                                    label: 'Ülések száma',
                                    required: true,
                                    min: 1,
                                    max: 10,
                                },
                                {
                                    type: 'number',
                                    name: 'kilometers',
                                    label: 'Kilométeróra állása',
                                    required: true,
                                }
                            ]
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    type: 'select',
                                    label: 'Hajtás',
                                    name: 'drive',
                                    required: true,
                                    options: [
                                        {
                                            label: 'Elsőkerék',
                                            value: 'front_wheel_drive',
                                        },
                                        {
                                            label: 'Hátsókerék',
                                            value: 'rear_wheel_drive',
                                        },
                                        {
                                            label: 'Összkerék',
                                            value: 'all_wheel_drive',
                                        },
                                    ]
                                },
                                {
                                    name: 'fuel_type',
                                    label: 'Üzemanyag',
                                    type: 'select',
                                    required: true,
                                    options: [
                                        {
                                            label: 'Benzin',
                                            value: 'petrol',
                                        },
                                        {
                                            label: 'Dízel',
                                            value: 'diesel',
                                        },
                                        {
                                            label: 'Hibrid',
                                            value: 'hybrid',
                                        },
                                        {
                                            label: 'Elektromos',
                                            value: 'electric',
                                        },
                                    ]
                                },
                                {
                                    type: 'text',
                                    name: 'engine_power',
                                    label: 'Teljesítmény',
                                    required: true,
                                },
                                {
                                    type: 'select',
                                    name: 'gearbox',
                                    label: 'Sebességváltó',
                                    required: true,
                                    options: [
                                        {
                                            label: 'Manuális',
                                            value: 'manual',
                                        },
                                        {
                                            label: 'Automata',
                                            value: 'automatic',
                                        },
                                        {
                                            label: 'Félautomata',
                                            value: 'semi_automatic',
                                        }
                                    ]
                                },
                                {
                                    type: 'number',
                                    name: 'engine_displacements',
                                    label: 'Hengerűrtartalom',
                                    required: true,
                                    min: 0,
                                    max: 10000,
                                }
                            ]
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    type: 'select',
                                    label: 'Külső szín',
                                    name: 'exterior_color',
                                    required: true,
                                    options: [
                                        {
                                            label: 'Fehér',
                                            value: 'white',
                                        },
                                        {
                                            label: 'Fekete',
                                            value: 'black',
                                        },
                                        {
                                            label: 'Piros',
                                            value: 'red',
                                        },
                                        {
                                            label: 'Kék',
                                            value: 'blue',
                                        },
                                        {
                                            label: 'Zöld',
                                            value: 'green',
                                        },
                                    ]
                                },
                                {
                                    type: 'select',
                                    name: 'interior_color',
                                    label: 'Belső szín',
                                    required: true,
                                    options: [
                                        {
                                            label: 'Fehér',
                                            value: 'white',
                                        },
                                        {
                                            label: 'Fekete',
                                            value: 'black',
                                        },
                                        {
                                            label: 'Piros',
                                            value: 'red',
                                        },
                                        {
                                            label: 'Kék',
                                            value: 'blue',
                                        },
                                        {
                                            label: 'Zöld',
                                            value: 'green',
                                        },
                                    ]
                                },
                                {
                                    name: 'interior_material',
                                    label: 'Kárpit típusa',
                                    type: 'select',
                                    required: true,
                                    options: [
                                        {
                                            label: 'Alcantara',
                                            value: 'alcantara',
                                        },
                                        {
                                            label: 'Bőr',
                                            value: 'leather',
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'group',
                            name: 'handover',
                            label: 'Átvételi adatok',
                            fields: [
                                {
                                    type: 'date',
                                    name: 'handover_date',
                                    label: 'Átvételi dátum',
                                    required: false,
                                    admin: {
                                        date: {
                                            minDate: new Date(),
                                        }
                                    }
                                },
                            ]
                        },
                        {
                            type: 'group',
                            name: 'promotion',
                            label: 'Promóciós adatok',
                            fields: [
                                {
                                    type: 'checkbox',
                                    name: 'is_promotional',
                                    label: 'Promóciós szöveg megjelenítése',
                                    admin: {
                                        description: 'A listázott nézetben a gépjármű kártyáján megjelenő sárga sávos szöveg.',
                                    },
                                    required: false,
                                },
                                {
                                    type: 'text',
                                    name: 'promotion_text',
                                    label: 'Promóciós szöveg',
                                    required: false,
                                    admin: {
                                        condition: (data) => {
                                            if (data.car_details.promotion.is_promotional) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'packages_prices',
                    label: 'Csomagok és árak',
                    fields: [
                        {
                            type: 'group',
                            name: 'renting',
                            label: 'Autókölcsönzés',
                            fields: [
                                {
                                    type: 'checkbox',
                                    name: 'is_rentable',
                                    label: 'Kölcsönözhető',
                                    required: false,
                                },
                                {
                                    name: 'renting_price_per_month',
                                    label: 'Havidíj',
                                    type: 'text',
                                    required: false,
                                }
                            ],
                        },
                        {
                            type: 'group',
                            name: 'subscription',
                            label: 'Előfizetés',
                            fields: [
                                {
                                    type: 'checkbox',
                                    name: 'is_subscribable',
                                    label: 'Előfizethető',
                                    required: false,
                                },
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            type: 'number',
                                            name: 'subscription_price_per_quarter',
                                            label: 'Negyedéves díj',
                                            required: false,
                                        },
                                        {
                                            type: 'number',
                                            name: 'subscription_price_per_half_year',
                                            label: 'Féléves díj',
                                            required: false,
                                        },
                                        {
                                            type: 'number',
                                            name: 'subscription_price_per_year',
                                            label: 'Éves díj',
                                            required: false,
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            type: 'group',
                            name: 'lease',
                            label: 'Lízing',
                            fields: [
                                {
                                    type: 'checkbox',
                                    name: 'is_leasable',
                                    label: 'Lízingelhető',
                                    required: false,
                                },
                                {
                                    type: 'text',
                                    name: 'lease_price_per_month',
                                    label: 'Havi díj',
                                    required: false,
                                }
                            ]
                        },
                        {
                            type: 'group',
                            name: 'car_category',
                            label: 'Autó kategória (belső infó)',
                            fields: [
                                {
                                    type: 'select',
                                    name: 'excepted_mileage',
                                    label: 'Futásigény',
                                    required: false,
                                    options: [
                                        {
                                            label: 'Magas',
                                            value: 'high',
                                        },
                                        {
                                            label: 'Alacsony',
                                            value: 'low',
                                        },
                                        {
                                            label: 'Közepes',
                                            value: 'medium',
                                        },
                                    ]
                                }
                            ],
                            virtual: true,
                        }
                    ]
                }
            ]
        },
        {
            type: 'group',
            name: 'preview',
            label: 'Előnézet',
            admin: {
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'image',
                    label: 'Kép',
                    type: 'upload',
                    relationTo: 'media',
                    required: false,
                    hasMany: false,
                }
            ]
        },
        {
            name: 'model',
            type: 'text',
            admin: {
                hidden: true,
            },
            hooks: {
                beforeChange: [
                    ({ data }) => {
                        return data?.car_details?.manufacturer + ' ' + data?.car_details?.model + ' ' + data?.car_details?.year
                    }
                ]
            }
        }
    ],
}