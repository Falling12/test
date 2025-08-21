"use server"
import { Reservation } from "@/payload-types"
import { getPayload } from "payload"
import payloadConfig from "@/payload.config"

export const createReservation = async (reservation: Reservation) => {
    try {
        const payload = await getPayload({
            config: payloadConfig
        })

        const newReservation = await payload.create({
            collection: 'reservations',
            data: {
                email: reservation.email,
                name: reservation.name,
                phone: reservation.phone,
                car: reservation.car,
                type: reservation.type,
                subscription_type: reservation.subscription_type,
                leasing_price: reservation.leasing_price,
                rental_price: reservation.rental_price
            }
        })

        return {
            success: true,
            reservation: newReservation,
            error: null
        }
    } catch (error) {
        throw new Error('Hiba történt! Próbálja újra később.')
    }
}