import { useContext, useState } from "react"

import LoginForm from "./components/LoginForm.tsx"
import RegistrationForm from "./components/RegistrationForm.tsx"
import { AuthContext } from "../../context/AuthContext.ts"
import { FirestoreDatabaseContext } from "../../context/FirestoreDatabaseContext.ts"
import { handleLoginFormSubmit, handleRegistrationFormSubmit } from "./callbacks.ts"

export default function LoginView() {

    const { setUser } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [showingLoginForm, setShowingLoginForm] = useState(true)

    return (
        <div>
            <div className="z-10 bg-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-xl">
                <div className="flex-col py-8 px-16 w-80 sm:w-96">
                    <p className="font-montserrat text-3xl font-bold text-center">Chess Tracker</p>
                    { showingLoginForm ?
                        <LoginForm
                            className="mt-16"
                            onSubmit={ data => { handleLoginFormSubmit(firestoreDatabase, setUser, data.email, data.password).then() } }
                            setShowingLoginForm={ setShowingLoginForm }
                        />
                        :
                        <RegistrationForm
                            className="mt-16"
                            onSubmit={ data => { handleRegistrationFormSubmit(firestoreDatabase, setUser, data.email, data.password, data.confirmPassword).then() } }
                            setShowingLoginForm={ setShowingLoginForm }
                        />
                    }
                </div>
            </div>

            <div className="z-0 fixed bg-accent opacity-50 w-full h-full" style={ { clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)" } } />
        </div>
    )

}
