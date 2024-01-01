import React, { useEffect } from "react"
import { toast } from "react-toastify"

import Button from "./Button.tsx"
import ConditionalRender from "./ConditionalRender.tsx"

interface ListProps<T> {
    title: string
    loader?: Promise<T[]>
    display: (type: T, onClick?: (t: T) => void) => React.ReactElement
    state: [T[], React.Dispatch<React.SetStateAction<T[]>>]
    className?: string
    trailingButton?: React.ReactElement<typeof Button>
    onClick?: (t: T) => void
    onEmpty?: React.ReactElement
}

export default function List<T>({ title, loader, display, className, state, trailingButton, onClick, onEmpty }: ListProps<T>) {

    const [loaderData, setLoaderData] = state

    useEffect(() => {
        if (!loader) return

        loader
            .then(data => setLoaderData(data))
            .catch(error => toast.error((error as Error).message))
    }, [])

    return (
        <div className={ "w-full " + (className ? className : "" )}>
            <div className="flex flex-col space-y-5 mx-16 2xl:mx-96">
                <p className="text-3xl opacity-50">{ title }</p>
                <ConditionalRender bool={ loaderData.length > 0 } onFalse={ onEmpty }>
                    { loaderData.map(data => display(data, onClick)) }
                </ConditionalRender>
                <ConditionalRender bool={ !!trailingButton }>
                    <div className={ "flex justify-center pt-4 " + (loaderData.length > 0 ? "md:justify-end" : "") }>
                        <div className="w-48">
                            { trailingButton }
                        </div>
                    </div>
                </ConditionalRender>
            </div>
        </div>
    )
}
