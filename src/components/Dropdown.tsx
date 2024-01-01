import React from "react"

interface DropdownProps<T> {
    className?: string
    placeholder: string
    options: T[]
    onChange: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function Dropdown<T extends { id: string, display: string }>({ className, placeholder, options, onChange }: DropdownProps<T>) {

    return (
        <div className={ className ? className : ""}>
            <select className="w-full focus:outline-none bg-transparent text-lg" defaultValue="default-value" onChange={ (e) => onChange(e.target.value) }>
                <option value="default-value" disabled={ true } hidden={ true }>{ placeholder }</option>
                {
                    options.map(data => {
                        return <option key={ data.id } value={ data.id }>{ data.display }</option>
                    })
                }
            </select>
            <hr className="border-t-primary" />
        </div>
    )
}
