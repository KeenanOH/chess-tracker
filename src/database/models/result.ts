import { School } from "./school.ts"
import { Board } from "./board.ts"

export interface Result {
    homeSchool: School,
    awaySchool: School,
    boards: Board[],
    homeScore: number,
    awayScore: number
}
