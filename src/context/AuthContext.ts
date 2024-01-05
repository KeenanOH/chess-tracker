import React, { createContext } from "react"

import { User } from "../database/models/firestore/user.ts"

interface IAuthContext {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
}

export const AuthContext = createContext<IAuthContext>({
    user: { },
    setUser: () => { }
})
