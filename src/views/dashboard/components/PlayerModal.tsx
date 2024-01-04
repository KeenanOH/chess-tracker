import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

import Modal from "../../../components/layouts/Modal.tsx"
import TextField from "../../../components/input/TextField.tsx"
import Button from "../../../components/input/Button.tsx"
import { SelectablePlayer } from "../../../database/models/player.ts"
import { User } from "../../../database/models/user.ts"
import { firestoreDatabase } from "../../../consts.ts"

interface PlayerModalProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    user: User
    playersState: [SelectablePlayer[], React.Dispatch<React.SetStateAction<SelectablePlayer[]>>]
    initialValue?: SelectablePlayer
}

export default function PlayerModal({ isOpen, setIsOpen, user, playersState, initialValue }: PlayerModalProps) {

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
                    setPlayers(players.concat({ id: player.id, firstName, lastName, selected: false }))
                    setIsOpen(false)

                    toast.success("Player has been created.")
                })
                .catch(error => toast.error((error as Error).message))
        else
            firestoreDatabase.updatePlayer(user.schoolId, initialValue.id, firstName, lastName)
                .then(() => {
                    const newPlayersArray = players.map(player => {
                        if (player.id != initialValue.id) return player
                        return { id: player.id, firstName, lastName, selected: player.selected }
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
