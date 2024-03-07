const SkeletonManga = () => {
    return (
        <div
            className="bg-white rounded-lg shadow-lg p-2 hover:text-indigo-500">
            <picture className="relative">
                <div className="animate-pulse bg-gray-200 h-[400px] w-full rounded-lg"></div>
                <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-900 to-neutral-500 py-1.5 rounded-sm text-white font-bold text-xs px-2 animate-pulse h-6 w-20"></div>
                <div className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-900 to-neutral-500 py-1.5 rounded-sm text-white font-bold text-xs px-2 animate-pulse h-6 w-20"></div>
            </picture>

            <div className="mt-2">
                <p className="text-sm font-semibold line-clamp-2 animate-pulse h-4 bg-gray-200 rounded-lg mb-1"></p>
                <p className="text-xs text-gray-500 line-clamp-1 animate-pulse h-4 bg-gray-200 rounded-lg"></p>
            </div>
        </div>
    )
}

export default SkeletonManga;