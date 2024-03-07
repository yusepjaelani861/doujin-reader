"use client"

import dynamic from "next/dynamic"
import Button from "./Button"
import { useState } from "react"
import { Search } from "react-feather"

const SearchButton: React.FC = () => {
    const [searchParams] = useState(new URLSearchParams(window.location.search))
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            <input
                type="text"
                placeholder="Search manga..."
                className="md:block hidden px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring focus:ring-indigo-200"
                defaultValue={searchParams.get("search") || ""}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        window.location.href = `/?search=${e.currentTarget.value}`
                    }
                }}
            />

            <div className="relative">
                <Button
                    type="button"
                    className="md:hidden block"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <Search size={24} />
                </Button>

            </div>
            <div className={`absolute top-16 left-0 z-50 w-full ${open ? "block" : "hidden"}`}>
                <div className="flex items-center justify-center w-full bg-white py-2 px-4">
                    <input
                        type="text"
                        placeholder="Search manga..."
                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring focus:ring-indigo-200 w-full"
                        defaultValue={searchParams.get("search") || ""}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                window.location.href = `/?search=${e.currentTarget.value}`
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(SearchButton), {
    ssr: false
})