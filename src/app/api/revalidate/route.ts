import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    // Check for secret to confirm this is a valid request
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { type, id, collection } = body

        if (collection === 'cars') {
            if (type === 'update' && id) {
                revalidatePath(`/details/${id}`)
                console.log(`Revalidated car page: /details/${id}`)
            } else if (type === 'create' || type === 'delete') {
                revalidatePath('/')
                revalidatePath('/details/[id]', 'page')
                console.log('Revalidated listing page and all car detail pages')
            }
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            message: `Successfully revalidated ${collection} ${type}`
        })
    } catch (err) {
        console.error('Error revalidating:', err)
        return NextResponse.json({
            message: 'Error revalidating',
            error: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 })
    }
}
