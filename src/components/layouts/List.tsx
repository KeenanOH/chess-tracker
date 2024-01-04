import React from "react"

import { Identifiable } from "../../types.ts"
import rightWardArrowUrl from "../../assets/right-arrow.svg"
import Title from "../typography/Title.tsx"
import Button from "../input/Button.tsx";
import ConditionalRender from "./ConditionalRender.tsx";

interface ListProps<T> {
    className?: string
    title: string
    state: [T[], React.Dispatch<React.SetStateAction<T[]>>]
    display: (data: T) => string
    onEmpty: string
    onClick?: (data: T) => void
    trailingButton?: React.ReactElement<typeof Button>
}

export default function List<T extends Identifiable>({ className = "", title, state, display, onEmpty, onClick, trailingButton }: ListProps<T>) {

    const [data] = state

    function handleClick(data: T) {
        if (onClick)
            onClick(data)
    }

    return (
        <div className={ "w-full " + className }>
            <div className="mx-16 2xl:mx-96">
                <Title>{ title }</Title>

                <ConditionalRender bool={ data.length > 0} onFalse={ <p className="text-center py-16">{ onEmpty }</p> }>
                    <div className="space-y-5">
                        {
                            data.map(data => {
                                return (
                                    <ListRow
                                        key={ data.id }
                                        onClick={ () => { handleClick(data) } }
                                    >
                                        { display(data) }
                                    </ListRow>
                                )
                            })
                        }
                    </div>
                </ConditionalRender>

                <ConditionalRender bool={ !!trailingButton }>
                    <div className={ "flex justify-center pt-4 " + (data.length > 0 ? "md:justify-end" : "") }>
                        <div className="w-48">
                            { trailingButton }
                        </div>
                    </div>
                </ConditionalRender>
            </div>
        </div>
    )
}

export function ListRow({ children, onClick }: { children: string, onClick?: () => void }) {
    return (
        <div className="flex" onClick={ onClick }>
            <div className="flex w-full text-xl py-3 shadow-lg rounded-xl transition ease-in-out hover:scale-105 active:scale-110">
                <p className="ml-6">{children}</p>
                <img className="ml-auto mr-5" src={ rightWardArrowUrl } alt="link-arrow" />
            </div>
        </div>
    )
}
