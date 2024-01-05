import { useContext } from "react"
import { Link } from "react-router-dom"

import { auth } from "../../database/firebaseConsts.ts"
import { AuthContext } from "../../context/AuthContext.ts"

export default function NavigationBar() {

    const { user, setUser } = useContext(AuthContext)

    async function handleLogout() {
        await auth.signOut()
        localStorage.removeItem("user")
        setUser({ })
    }

    return (
        <div className="h-16 grid w-full items-center shadow-lg">
            <div className="flex font-montserrat justify-center">
                <Link className="text-xl ml-16 font-bold hover:opacity-75 active:opacity-50 cursor-pointer" to="/">
                    { "Chess Tracker" + (user.isAdmin ? " (Admin)": "")}
                </Link>
                <Link className="ml-auto mr-16 text-base hover:opacity-75 active:opacity-50 cursor-pointer" to="/dashboard">Dashboard</Link>
                {
                    user.id ?
                        <p className="mr-16 text-base hover:opacity-75 active:opacity-50 cursor-pointer" onClick={ handleLogout }>Logout</p>
                        :
                        <p></p>
                }
            </div>
        </div>
    )
}
