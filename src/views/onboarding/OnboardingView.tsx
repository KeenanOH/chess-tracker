import { useState, useContext } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import ListRow from "../../components/lists/ListRow.tsx"
import OnboardingModal from "./components/OnboardingModal.tsx"
import { AuthContext } from "../../context/AuthContext.ts"
import { FirestoreDatabaseContext } from "../../context/FirestoreDatabaseContext.ts"

export default function OnboardingView() {

    const { user, setUser } = useContext(AuthContext)
    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [modalPresented, setModalPresented] = useState(false)
    
    async function handleSchoolAccessCodeSubmit(schoolAccessCode: string) {
        if (!user.id) return

        try {
            await firestoreDatabase.updateOrCreateUser(user.id, schoolAccessCode)

            setUser({
                id: user.id,
                schoolId: schoolAccessCode,
                isAdmin: user.isAdmin
            })
        } catch (error) {
            console.log(error)
            toast.error("Error updating school's access code")
        }
    }

    return (
        <div>
            <NavigationBar />
            <div className="mx-8 mt-6">
                <p className="text-3xl opacity-50 mb-4">Welcome, Coach!</p>
                <ListRow onClick={ () => setModalPresented(true) }>
                    Click here to complete the onboarding process!
                </ListRow>
            </div>

            <OnboardingModal
                isOpen={ modalPresented }
                setIsOpen={ setModalPresented }
                onSubmit={ handleSchoolAccessCodeSubmit }
            />
        </div>
    )
}
