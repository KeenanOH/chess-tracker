import { useState } from "react"

import { Identifiable } from "../../types.ts"
import ConditionalRender from "../layouts/ConditionalRender.tsx"
import Title from "../typography/Title.tsx"
import { EditableListProps } from "./types.ts"
import EditableListRow from "./EditableListRow.tsx"

export default function EditableList<T extends Identifiable>({ className = "", title, state, display, actions, onClick, onEmpty, trailingButton }: EditableListProps<T>) {

    const [data] = state
    const [selectedData, setSelectedData] = useState<T[]>([])

    const [editing, setEditing] = useState(false)

    function toggleEditing() {
        if (editing)
            setSelectedData([])

        setEditing(editing => !editing)
    }

    function handleOnChange(id: string) {
        const alreadySelected = selectedData.find(data => data.id === id)

        if (alreadySelected) {
            setSelectedData(prevData => prevData.filter(data => data.id != id))
            return
        }

        const selectedDataObj = data.find(d => d.id === id)

        if (selectedDataObj)
            setSelectedData(selectedData => selectedData.concat(selectedDataObj))
    }

    function handleClick(data: T) {
        if (onClick)
            onClick(data)
    }

    return (
        <div className={ "w-full " + className }>
            <div className="mx-16 2xl:mx-96">
                <Title>{ title }</Title>

                <ConditionalRender bool={ data.length > 0} onFalse={ <p className="text-center py-16">{ onEmpty }</p> }>
                    <div className="flex justify-end space-x-8 select-none pb-2 text-xl">
                        <ConditionalRender bool={ editing }>
                            {
                                actions.map(action => {
                                    return (
                                        <p
                                            key={ action.name }
                                            className={ "cursor-pointer hover:opacity-75 active:opacity-50 " + (action.destructive ? "text-red" : "text-accent") }
                                            onClick={ () => {
                                                action.callback(selectedData)
                                                toggleEditing()
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
