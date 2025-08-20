import ListingGrid from "@/components/listing/listinggrid"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import payloadConfig from "@/payload.config"
import { getPayload } from "payload"
import { Car } from "@/payload-types"
import { Suspense } from "react"

type CarsResponse = {
  docs: Car[]
  page: number
  totalPages: number
  totalDocs: number
  hasNextPage?: boolean
  hasPrevPage?: boolean
  nextPage?: number | null
  prevPage?: number | null
}

const PAGE_SIZE = 9

const fetchCars = async (page: number): Promise<CarsResponse> => {
  try {
    const payload = await getPayload({
      config: payloadConfig
    })

    const cars = await payload.find({
      collection: 'cars',
      limit: PAGE_SIZE,
      depth: 1,
      page,
      sort: '-createdAt',
      pagination: true,
    })

    return cars as unknown as CarsResponse
  } catch (error) {
    console.error(error)
    return {
      docs: [],
      page: 1,
      totalPages: 1,
      totalDocs: 0
    }
  }
}

function getPaginationRange(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  const delta = 1
  const range: (number | 'ellipsis')[] = []
  const left = Math.max(2, currentPage - delta)
  const right = Math.min(totalPages - 1, currentPage + delta)

  range.push(1)

  if (left > 2) range.push('ellipsis')

  for (let p = left; p <= right; p++) {
    if (p > 1 && p < totalPages) range.push(p)
  }

  if (right < totalPages - 1) range.push('ellipsis')

  if (totalPages > 1) range.push(totalPages)

  return Array.from(new Set(range))
}

// Component for loading skeleton
function CarsGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2 max-[1400px]:grid-cols-2 max-[900px]:grid-cols-1 gap-y-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="relative w-full aspect-[378/339] rounded-lg bg-gray-200 animate-pulse overflow-hidden">
          {/* Header skeleton */}
          <div className="absolute top-0 left-0 right-0 p-4">
            <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>

          {/* Footer skeleton */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex gap-2 mb-3">
              <div className="h-6 bg-gray-300 rounded-full w-16"></div>
              <div className="h-6 bg-gray-300 rounded-full w-12"></div>
              <div className="h-6 bg-gray-300 rounded-full w-20"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Component that fetches and displays cars
async function CarsContent({ currentPage }: { currentPage: number }) {
  const carsRes = await fetchCars(currentPage)
  const pages = getPaginationRange(carsRes.page, carsRes.totalPages)

  return (
    <>
      <ListingGrid cars={carsRes.docs} />

      {carsRes.totalPages > 1 && (
        <Pagination className="mt-2">
          <PaginationContent>
            {carsRes.page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/?page=${carsRes.page - 1}`} prefetch={true} scroll={false} />
              </PaginationItem>
            )}

            {pages.map((p, idx) => (
              <PaginationItem key={`${p}-${idx}`}>
                {p === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink href={`/?page=${p}`} isActive={p === carsRes.page} prefetch={true} scroll={false}>
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {carsRes.page < carsRes.totalPages && (
              <PaginationItem>
                <PaginationNext href={`/?page=${carsRes.page + 1}`} prefetch={true} scroll={false} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams ?? {}
  const currentPage = Math.max(1, Number(pageParam) || 1)

  return (
    <div className="flex flex-col gap-8 px-[15%] py-8 max-[1400px]:px-[10%] max-[900px]:px-[3%]">
      <h1 className="font-semibold text-3xl">
        Elérhető autóink
      </h1>

      <Suspense key={currentPage} fallback={<CarsGridSkeleton />}>
        <CarsContent currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
