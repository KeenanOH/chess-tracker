import React from "react"
import RModal from "react-modal"

interface ModalProps {
    children: React.ReactElement | React.ReactElement[]
    title: string
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ children, title, isOpen, setIsOpen }: ModalProps) {
    return (
        <RModal className="flex h-full justify-center items-center border-none" isOpen={ isOpen }>
            <div className="flex flex-col bg-background border-none rounded-xl max-w-screen-md pt-4 pb-8 mx-16 shadow-lg">
                <div className="mx-16">
                    <button className="text-3xl w-full text-right hover:opacity-75 active:opacity-50" onClick={ () => { setIsOpen(false) } }>x</button>
                    <p className="text-3xl opacity-50">{ title }</p>

                    { children }
                </div>
            </div>
        </RModal>
    )
}
