import React from "react"
import { Link } from "react-router-dom"

import { auth } from "../../database/firebase.ts"
import { User } from "../../database/users.ts"

interface NavigationBarProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}



export default function NavigationBar({ user, setUser }: NavigationBarProps) {
    async function handleLogout() {
        await auth.signOut()
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <div className="h-16 grid w-full items-center shadow-lg">
            <div className="flex font-montserrat">
                <Link className="text-xl ml-16 font-bold hover:opacity-75 active:opacity-50 cursor-pointer" to="/">
                    { "Chess Tracker" + (user?.isAdmin ? " (Admin)": "")}
                </Link>
                <Link className="ml-auto mr-16 text-base hover:opacity-75 active:opacity-50 cursor-pointer" to="/dashboard">Dashboard</Link>
                {
                    user ?
                        <p className="mr-16 text-base hover:opacity-75 active:opacity-50 cursor-pointer" onClick={ handleLogout }>Logout</p>
                        :
                        <p></p>
                }
            </div>
        </div>
    )
}
