import { auth } from "../database/firebase.ts"

import { Link } from "react-router-dom"
import {onAuthStateChanged, User} from "firebase/auth"
import {useEffect, useState} from "react";

interface NavigationBarProps {
    isAdmin?: boolean
}

async function handleLogout() {
    await auth.signOut()
    localStorage.removeItem("user")
}

export default function NavigationBar({ isAdmin }: NavigationBarProps) {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    })

    return (
        <div className="h-16 grid w-full items-center shadow-lg">
            <div className="flex font-montserrat">
                <p className="text-xl ml-16 font-bold hover:opacity-75 active:opacity-50 cursor-pointer">
                    { "Chess Tracker" + (isAdmin ? " (Admin)": "")}
                </p>
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
