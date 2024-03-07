import axiosDefault from "axios"

const axios = axiosDefault.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

export default axios
