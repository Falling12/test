/**
 * Revalidation utilities for triggering cache invalidation
 */

interface RevalidationOptions {
    paths?: string[] | string
    tags?: string[] | string
    secret?: string
}

interface LegacyRevalidationOptions {
    collection: string
    type?: string
    id?: string
    secret?: string
}

/**
 * Revalidate specific paths or tags using the dynamic revalidation API
 * 
 * @param options - Revalidation options containing paths and/or tags
 * @returns Promise with revalidation result
 * 
 * @example
 * // Revalidate single path
 * await revalidate({ paths: '/details/123' })
 * 
 * // Revalidate multiple paths
 * await revalidate({ paths: ['/details/123', '/', '/about'] })
 * 
 * // Revalidate by tags
 * await revalidate({ tags: ['cars', 'listings'] })
 * 
 * // Revalidate both paths and tags
 * await revalidate({ 
 *   paths: ['/details/123', '/'],
 *   tags: ['cars'] 
 * })
 */
export async function revalidate(options: RevalidationOptions): Promise<{
    success: boolean
    message?: string
    revalidatedPaths?: string[]
    revalidatedTags?: string[]
    error?: string
}> {
    try {
        const secret = options.secret || process.env.REVALIDATION_SECRET

        if (!secret) {
            throw new Error('REVALIDATION_SECRET is required')
        }

        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        const url = `${baseUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paths: options.paths,
                tags: options.tags,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.error || data.message || 'Revalidation failed',
            }
        }

        return {
            success: true,
            message: data.message,
            revalidatedPaths: data.revalidatedPaths,
            revalidatedTags: data.revalidatedTags,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        }
    }
}

/**
 * Convenience functions for common revalidation scenarios
 */

/**
 * Revalidate car detail page
 */
export async function revalidateCarDetails(carId: string, secret?: string) {
    return revalidate({
        paths: `/details/${carId}`,
        secret,
    })
}

/**
 * Revalidate home page and all car listings
 */
export async function revalidateCarListings(secret?: string) {
    return revalidate({
        paths: ['/', '/details/[id]'],
        secret,
    })
}

/**
 * Revalidate multiple car detail pages
 */
export async function revalidateMultipleCarDetails(carIds: string[], secret?: string) {
    return revalidate({
        paths: carIds.map(id => `/details/${id}`),
        secret,
    })
}

/**
 * Revalidate by cache tags
 */
export async function revalidateByTags(tags: string[] | string, secret?: string) {
    return revalidate({
        tags,
        secret,
    })
}

export async function revalidateAszf(secret?: string) {
    return revalidate({
        paths: '/aszf',
        secret,
    })
}