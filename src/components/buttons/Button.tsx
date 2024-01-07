import React from "react"

interface ButtonProps {
    children: string | React.ReactElement
    className?: string
    type?: "submit" | "button" | "reset"
    onClick?: () => void
}

export default function Button({ children, className = "", type = "button", onClick }: ButtonProps) {
    return (
        <button
            className={ "rounded-xl text-xl bg-primary text-background py-2 hover:opacity-75 active:opacity-50 " + className }
            type={ type }
            onClick={ () => onClick ? onClick() : {} }
        >
            { children }
        </button>
    )
}
