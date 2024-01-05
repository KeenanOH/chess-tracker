import React from "react";
import Button from "../buttons/Button.tsx";

export interface ListProps<T> {
    className?: string
    title: string
    state: [T[], React.Dispatch<React.SetStateAction<T[]>>]
    display: (data: T) => string
    onEmpty: string
    onClick?: (data: T) => void
    trailingButton?: React.ReactElement<typeof Button>
}

export interface EditableListProps<T> extends ListProps<T> {
    actions: { name: string, destructive?: boolean, callback: (data: T[]) => void }[]

}

export interface ListRowProps {
    children: string
    onClick?: () => void
}

export interface EditableListRowProps extends ListRowProps {
    editing: boolean
    onChange: () => void
}
