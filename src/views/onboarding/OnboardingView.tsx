import { useState } from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import ListRow from "../../components/ListRow.tsx"
import OnboardingModal from "./components/OnboardingModal.tsx";

async function handleSchoolAccessCodeSubmit(schoolAccessCode: string) {
    console.log(schoolAccessCode)
}

export default function OnboardingView() {

    const [modalPresented, setModalPresented] = useState(false)

    return (
        <div>
            <NavigationBar />
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
