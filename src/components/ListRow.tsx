import React from "react"
import { Link } from "react-router-dom"

import rightWardArrowUrl from "../assets/right-arrow.svg"


interface ListRowProps {
    children: React.ReactElement | string
    className?: string
    onClick?: () => void
    to?: string
}

export default function ListRow({ children, className, onClick, to }: ListRowProps) {
    if (to)
        return (
            <Link
                className={ "flex text-xl py-3 shadow-lg rounded-xl " + (className ? className : "") }
                to={ to }
                onClick={ onClick }
            >
                <span className="ml-6">{children}</span>
                <img className="ml-auto mr-5" src={ rightWardArrowUrl } alt="link-arrow" />
            </Link>
        )

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
