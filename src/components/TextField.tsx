import React from "react"

interface TextFieldProps {
    placeholder?: string
    value?: string
    secure?: boolean
    onChange: React.Dispatch<React.SetStateAction<string>>
}

export default function TextField({ placeholder, value, secure, onChange }: TextFieldProps) {
    return (
        <div>
            <input
                className="focus:outline-none bg-transparent text-lg"
                type={ secure ? "password" : "text"}
                placeholder={ placeholder }
                value={ value }
                onChange={ (element) => {
                    onChange(element.target.value)
                } }
            />
            <hr className="border-t-primary" />
        </div>
    )
}
