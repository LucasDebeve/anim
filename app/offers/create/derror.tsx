'use client' // Derror components must be Client Components

import { useEffect } from 'react'
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertTriangle} from "lucide-react";

export default function Derror({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <Alert>
            <AlertTriangle className="w-6 h-6 mr-2"/>
            <AlertTitle>{error.name}</AlertTitle>
            <AlertDescription>
                {error.message}
            </AlertDescription>
        </Alert>
    )
}