import React from "react"

import rightWardArrowUrl from "../assets/right-arrow.svg"

interface ListRowProps {
    children: React.ReactElement | string
    className?: string
    onClick?: () => void
}

export default function ListRow({ children, className, onClick }: ListRowProps) {
    return (
        <div
            className={ "flex text-xl py-3 shadow-lg rounded-xl " + (className ? className : "") }
            onClick={ onClick }
        >
            <span className="ml-6">{children}</span>
            <img className="ml-auto mr-5" src={ rightWardArrowUrl } alt="link-arrow" />
        </div>
    )
}
