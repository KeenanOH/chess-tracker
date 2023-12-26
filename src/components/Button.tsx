import React from "react"

interface ButtonProps {
    children: string | React.ReactElement
    className?: string
    onClick: () => void
}

export default function Button({ children, className, onClick }: ButtonProps) {
    return (
        <button
            className={ "rounded-xl text-xl bg-primary text-background py-2 w-full hover:opacity-75 active:opacity-50" + (className ? className : "") }
            onClick={ onClick }
        >
            { children }
        </button>
    )
}
