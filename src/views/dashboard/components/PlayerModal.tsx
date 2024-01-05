import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import Modal from "../../../components/layouts/Modal.tsx"
import TextField from "../../../components/input/TextField.tsx"
import Button from "../../../components/buttons/Button.tsx"
import { Player } from "../../../database/models/firestore/player.ts"
import { User } from "../../../database/models/firestore/user.ts"
import { FirestoreDatabaseContext } from "../../../context/FirestoreDatabaseContext.ts"

interface PlayerModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: User
    playersState: [Player[], React.Dispatch<React.SetStateAction<Player[]>>]
    initialValue?: Player
}

export default function PlayerModal({ isOpen, setIsOpen, user, playersState, initialValue }: PlayerModalProps) {

    const firestoreDatabase = useContext(FirestoreDatabaseContext)

    const [players, setPlayers] = playersState

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        if (!initialValue) {
            setFirstName("")
            setLastName("")
            return
        }

        setFirstName(initialValue.firstName)
        setLastName(initialValue.lastName)
    }, [initialValue])

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!user.schoolId || firstName === "" || lastName === "") return

        if (!initialValue)
            firestoreDatabase.createPlayer(user.schoolId, firstName, lastName)
                .then(player => {
                    setPlayers(players.concat(player))
                    setIsOpen(false)

                    toast.success("Player has been created.")
                })
                .catch(error => toast.error((error as Error).message))
        else
            firestoreDatabase.updatePlayer(user.schoolId, initialValue.id, firstName, lastName)
                .then(() => {
                    const newPlayersArray = players.map(player => {
                        if (player.id != initialValue.id) return player
                        return player
                    })
                    setPlayers(newPlayersArray)
                    setIsOpen(false)

                    toast.success("Player has been updated.")
                })
                .catch(error => toast.error((error as Error).message))
    }

    return (
        <Modal title={ initialValue ? "Update Player" : "Add Player"} isOpen={ isOpen } setIsOpen={ setIsOpen }>
            <form className="p-8 space-y-8" onSubmit={ handleFormSubmit }>
                <TextField placeholder="First Name" value={ firstName } onChange={ setFirstName } />
                <TextField placeholder="Last Name" value={ lastName } onChange={ setLastName } />

                <Button type="submit">{ initialValue ? "Update" : "Add" }</Button>
            </form>
        </Modal>
    )
}
