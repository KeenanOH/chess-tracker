import React from "react"

interface ConditionalRenderProps {
    children: React.ReactElement
    bool: boolean
    onFalse?: React.ReactElement | null
}

export default function ConditionalRender({ bool, children, onFalse = null }: ConditionalRenderProps) {
    if (!bool) return onFalse ? onFalse : null

    return children
}
