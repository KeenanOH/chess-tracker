import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

import Button from "./Button.tsx"

interface TrailingButtonProps {
    trailingButton?: React.ReactElement<typeof Button>
}

function TrailingButton({ trailingButton }: TrailingButtonProps) {
    if (!trailingButton)
        return <div></div>

    return (
        <div className="flex justify-center md:justify-end pt-4">
            <div className="w-48">
                { trailingButton }
            </div>
        </div>
    )
}

interface ListProps<T> {
    title: string
    loader: Promise<T[]>
    display: (type: T) => React.ReactElement
    className?: string
    trailingButton?: React.ReactElement<typeof Button>
}

export default function List<T>({ title, loader, display, className, trailingButton }: ListProps<T>) {

    const [loaderData, setLoaderData] = useState<T[]>([])

    useEffect(() => {
        loader
            .then(data => setLoaderData(data))
            .catch(error => toast.error((error as Error).message))
    }, [loader])

    return (
        <div className={ "w-full " + (className ? className : "" )}>
            <div className="flex flex-col space-y-5 mx-16 2xl:mx-96">
                <p className="text-3xl opacity-50 pb-5">{ title }</p>
                { loaderData.map(data => display(data)) }
                <TrailingButton trailingButton={ trailingButton } />
            </div>
        </div>
    )
}
