
export interface Player {
    id: string
    firstName: string
    lastName: string
}

export interface SelectablePlayer extends Player {
    selected: boolean
}
