export default function Loading() {
    return (
        <div className="flex flex-col gap-8 px-[15%] py-8 max-[1400px]:px-[10%] max-[900px]:px-[3%]">
            <h1 className="font-semibold text-3xl">
                Elérhető autóink
            </h1>

            <div className="grid grid-cols-3 gap-2 max-[1400px]:grid-cols-2 max-[900px]:grid-cols-1 gap-y-8">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="relative w-full aspect-[378/339] rounded-lg bg-gray-200 animate-pulse" />
                ))}
            </div>
        </div>
    )
}

