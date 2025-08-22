// Helper function to trigger revalidation via API
export const revalidateDetailsPage = async (id: string) => {
    try {
        // Only trigger revalidation in production with the secret set
        if (process.env.NODE_ENV === 'production' && process.env.REVALIDATION_SECRET) {
            const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
            const response = await fetch(`${baseUrl}/api/revalidate?secret=${process.env.REVALIDATION_SECRET}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'update',
                    id: id,
                    collection: 'cars'
                }),
            })

            if (!response.ok) {
                console.error('Failed to revalidate:', await response.text())
            } else {
                console.log(`Successfully triggered revalidation for car ${id}`)
            }
        } else if (process.env.NODE_ENV === 'development') {
            console.log(`Would revalidate car ${id} in production`)
        }
    } catch (error) {
        console.error('Error triggering revalidation:', error)
    }
}