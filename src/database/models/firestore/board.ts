import { Player } from "./player.ts"

export interface Board {
    id: string
    homePlayer?: Player
    awayPlayer?: Player
    number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    result: "home" | "away" | "draw" | ""
}
