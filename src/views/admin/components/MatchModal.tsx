import React, { useContext, useState } from "react"
import { toast } from "react-toastify"


import Modal from "../../../components/layouts/Modal.tsx"
import Dropdown from "../../../components/input/Dropdown.tsx"
import Button from "../../../components/buttons/Button.tsx"
import { School } from "../../../database/models/firestore/school.ts"
import { Match } from "../../../database/models/firestore/match.ts"
import { FirestoreDatabaseContext } from "../../../context/FirestoreDatabaseContext.ts"

interface MatchModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    date: Date
    schools: School[]
    matchesState: [Match[], React.Dispatch<React.SetStateAction<Match[]>>]
}


export default function MatchModal({ isOpen, setIsOpen, date, schools, matchesState }: MatchModalProps) {

    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [matches, setMatches] = matchesState
    const [homeSchoolId, setHomeSchoolId] = useState<string>()
    const [awaySchoolId, setAwaySchoolId] = useState<string>()

    const dropdownOptions = schools.map(school => {
        return { id: school.id, display: school.name}
    })

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!homeSchoolId || !awaySchoolId) return

        const homeSchool = schools.find(school => { return school.id == homeSchoolId })
        const awaySchool = schools.find(school => { return school.id == awaySchoolId })

        if (!homeSchool || !awaySchool) return

        firestoreDatabase.createMatch(homeSchool, awaySchool, date)
            .then(match => {
                setMatches(matches.concat(match))
                setIsOpen(false)

                toast.success("Created match")
            })
            .catch(error => toast.error((error as Error).message))
    }

    return (
        <Modal title="Matches" isOpen={ isOpen } setIsOpen={ setIsOpen }>
            <p className="pt-2">{ `Create a match for ${date.toDateString()}` }</p>
            <form className="space-y-8" onSubmit={ handleFormSubmit }>
                <Dropdown className="w-64" placeholder="Home School" options={ dropdownOptions } onChange={ setHomeSchoolId } />
                <Dropdown className="w-64" placeholder="Away School" options={ dropdownOptions } onChange={ setAwaySchoolId } />

                <Button type="submit">Create</Button>
            </form>
        </Modal>
    )
}
