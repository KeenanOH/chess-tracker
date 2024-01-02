import { Player } from "./player.ts"

export interface Board {
    id: string
    homePlayer: Player
    awayPlayer: Player
    number: number
    result: "home" | "away" | "draw" | ""
}
