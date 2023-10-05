import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";

export default function useFetch(url) {

    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function fetchData(url) {
            try {
                const res = await fetch(url)
                const data = await res.json()
                setUserData(data)

            } catch(err) {
                console.log(err)
                setError(true)

            } finally {
                setIsLoading(false)
            }
        }
        fetchData(url)
    }, [url]);

    return { isLoading, userData, error }
}
