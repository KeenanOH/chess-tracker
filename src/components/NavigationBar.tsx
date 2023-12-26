import React from "react"

export default function NavigationBar() {
    return (
        <div className="h-16 grid w-full items-center shadow-lg">
            <div className="flex font-montserrat">
                <p className="text-xl ml-16 font-bold hover:opacity-75 active:opacity-50 cursor-pointer">Chess Tracker</p>
                <p className="ml-auto mr-16 text-base hover:opacity-75 active:opacity-50 cursor-pointer">Dashboard</p>
            </div>
        </div>
    )
}
