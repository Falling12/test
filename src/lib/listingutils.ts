export const getFuelType = (fuelType: string) => {
    switch (fuelType) {
        case 'petrol':
            return 'Benzin'
        case 'diesel':
            return 'Dízel'
        case 'electric':
            return 'Elektromos'
        case 'hybrid':
            return 'Hibrid'
        default:
            return fuelType
    }
}

export const getTransmissionType = (transmissionType: string) => {
    switch (transmissionType) {
        case 'manual':
            return 'Manuális'
        case 'automatic':
            return 'Automata'
        case 'semi-automatic':
            return 'Fél-Automata'
        default:
            return transmissionType
    }
}

export const getDriveType = (driveType: string) => {
    switch (driveType) {
        case 'front_wheel_drive':
            return 'Elsőkerék'
        case 'rear_wheel_drive':
            return 'Hátsókerék'
        case 'all_wheel_drive':
            return 'Összekerék'
        default:
            return driveType
    }
}

export const getInteriorMaterial = (interiorMaterial: string) => {
    switch (interiorMaterial) {
        case 'leather':
            return 'Bőr'
        case 'alcantara':
            return 'Alcantara'
        default:
            return interiorMaterial
    }
}

export const getCarColor = (carColor: string) => {
    switch (carColor) {
        case 'black':
            return 'Fekete'
        case 'white':
            return 'Fehér'
        case 'red':
            return 'Piros'
        case 'blue':
            return 'Kék'
        case 'green':
            return 'Zöld'
        case 'yellow':
            return 'Sárga'
        default:
            return carColor
    }
}