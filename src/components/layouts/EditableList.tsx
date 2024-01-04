import React, { useState } from "react"

import { Selectable } from "../../types.ts"
import ConditionalRender from "./ConditionalRender.tsx"
import rightWardArrowUrl from "../../assets/right-arrow.svg"
import Title from "../typography/Title.tsx"
import Button from "../input/Button.tsx"

interface EditableListProps<T> {
    className?: string
    title: string
    state: [T[], React.Dispatch<React.SetStateAction<T[]>>]
    display: (data: T) => string
    actions: { name: string, destructive?: boolean, callback: (data: T[]) => void }[]
    onEmpty: string
    onClick?: (data: T) => void
    trailingButton?: React.ReactElement<typeof Button>
}

export default function EditableList<T extends Selectable>({ className = "", title, state, display, actions, onClick, onEmpty, trailingButton }: EditableListProps<T>) {

    const [data, setData] = state

    const [editing, setEditing] = useState(false)

    function toggleEditing() {
        if (editing)
            setData(data => {
                return data.map(element => {
                    element.selected = !element.selected
                    return element
                })
            })

        setEditing(editing => !editing)
    }

    function handleOnChange(id: string) {
        setData(data => {
            return data.map(element => {
                if (element.id != id) return element

                element.selected = !element.selected
                return element
            })
        })
    }

    function handleClick(data: T) {
        if (onClick)
            onClick(data)
    }

    return (
        <div className={ "w-full " + className }>
            <div className="mx-16 2xl:mx-96">
                <Title>{ title }</Title>

                <div className="flex justify-end space-x-8 select-none pb-2 text-xl">
                    <ConditionalRender bool={ editing }>
                        {
                            actions.map(action => {
                                return (
                                    <p
                                        key={ action.name }
                                        className={ action.destructive ? "text-red" : ""}
                                        onClick={ () => {
                                            action.callback(data.filter(data => data.selected))
                                            setEditing(false)
                                        } }
                                    >
                                        { action.name }
                                    </p>
                                )
                            })
                        }
                    </ConditionalRender>

                    <p
                        className="text-accent cursor-pointer hover:opacity-75 active:opacity-50"
                        onClick={ toggleEditing }
                    >
                        { editing ? "Cancel" : "Edit" }
                    </p>
                </div>

                <ConditionalRender bool={ data.length > 0} onFalse={ <p className="text-center py-16">{ onEmpty }</p> }>
                    <div className="space-y-5 select-none">
                        {
                            data.map(data => {
                                return (
                                    <EditableListRow
                                        key={ data.id }
                                        editing={ editing }
                                        onChange={ () => handleOnChange(data.id) }
                                        onClick={ () => { handleClick(data) } }
                                    >
                                        { display(data) }
                                    </EditableListRow>
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

function EditableListRow({ children, editing, onChange, onClick }: { children: string, editing: boolean, onChange: () => void, onClick?: () => void }) {
    return (
        <div className="flex items-center">
            <ConditionalRender bool={ editing }>
                <input className="mr-8 scale-125 accent-primary" type="checkbox" onChange={ () => { onChange() } } />
            </ConditionalRender>

            <div
                className="flex w-full text-xl items-center py-3 shadow-lg rounded-xl transition ease-in-out hover:scale-105 active:scale-110"
                onClick={ onClick }
            >
                <span className="ml-6">{ children }</span>
                <img className="ml-auto mr-5 h-4" src={ rightWardArrowUrl } alt="link-arrow" />
            </div>
        </div>
    )
}
