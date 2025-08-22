import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

interface RevalidationRequest {
    // Support for multiple revalidation strategies
    paths?: string[] | string
    tags?: string[] | string
    // Legacy support for existing format
    type?: string
    id?: string
    collection?: string
}

export async function POST(request: NextRequest) {
    // Check for secret to confirm this is a valid request
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    try {
        const body: RevalidationRequest = await request.json()
        const { paths, tags, type, id, collection } = body

        const revalidatedPaths: string[] = []
        const revalidatedTags: string[] = []

        // New dynamic URL-based revalidation
        if (paths) {
            const pathsArray = Array.isArray(paths) ? paths : [paths]

            for (const path of pathsArray) {
                // Validate the path format
                if (!isValidPath(path)) {
                    return NextResponse.json({
                        message: `Invalid path format: ${path}`,
                        error: 'Path must start with / and contain valid URL characters'
                    }, { status: 400 })
                }

                revalidatePath(path)
                revalidatedPaths.push(path)
                console.log(`Revalidated path: ${path}`)
            }
        }

        // Tag-based revalidation
        if (tags) {
            const tagsArray = Array.isArray(tags) ? tags : [tags]

            for (const tag of tagsArray) {
                revalidateTag(tag)
                revalidatedTags.push(tag)
                console.log(`Revalidated tag: ${tag}`)
            }
        }

        // Legacy support for existing collection-based revalidation
        if (collection && !paths && !tags) {
            const legacyPaths = handleLegacyRevalidation(collection, type, id)
            revalidatedPaths.push(...legacyPaths)
        }

        // If no revalidation was performed, return error
        if (revalidatedPaths.length === 0 && revalidatedTags.length === 0) {
            return NextResponse.json({
                message: 'No valid revalidation parameters provided',
                error: 'Provide either paths, tags, or legacy collection parameters'
            }, { status: 400 })
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            revalidatedPaths,
            revalidatedTags,
            message: `Successfully revalidated ${revalidatedPaths.length} paths and ${revalidatedTags.length} tags`
        })
    } catch (err) {
        console.error('Error revalidating:', err)
        return NextResponse.json({
            message: 'Error revalidating',
            error: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 })
    }
}

function isValidPath(path: string): boolean {
    // Basic path validation
    if (!path.startsWith('/')) return false

    // Check for invalid characters (basic validation)
    const invalidChars = /[<>:"|?*]/
    if (invalidChars.test(path)) return false

    return true
}

function handleLegacyRevalidation(collection: string, type?: string, id?: string): string[] {
    const revalidatedPaths: string[] = []

    if (collection === 'cars') {
        if (type === 'update' && id) {
            revalidatePath(`/details/${id}`)
            revalidatedPaths.push(`/details/${id}`)
            console.log(`Revalidated car page: /details/${id}`)
        } else if (type === 'create' || type === 'delete') {
            revalidatePath('/')
            revalidatePath('/details/[id]', 'page')
            revalidatedPaths.push('/', '/details/[id]')
            console.log('Revalidated listing page and all car detail pages')
        }
    }

    return revalidatedPaths
}
