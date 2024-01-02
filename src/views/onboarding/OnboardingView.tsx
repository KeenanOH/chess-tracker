import React, { useState } from "react"
import { toast } from "react-toastify"

import NavigationBar from "../../components/layouts/NavigationBar.tsx"
import ListRow from "../../components/typography/ListRow.tsx"
import OnboardingModal from "./components/OnboardingModal.tsx"
import { createUser, User } from "../../database/users.ts"


interface OnboardingViewProps {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function OnboardingView({ user, setUser }: OnboardingViewProps) {

    const [modalPresented, setModalPresented] = useState(false)
    
    async function handleSchoolAccessCodeSubmit(schoolAccessCode: string) {
        if (!user) return

        try {
            await createUser(user.id, schoolAccessCode)

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
            <NavigationBar user={ user } setUser={ setUser } />
            <div className="mx-8 mt-6">
                <p className="text-3xl opacity-50 mb-4">Welcome, Coach!</p>
                <ListRow
                    className="hover:opacity-75 active:opacity-50 cursor-pointer"
                    onClick={ () => {
                        setModalPresented(true)
                    } }
                >
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
