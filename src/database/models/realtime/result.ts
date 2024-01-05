import { School } from "../firestore/school.ts"
import { Board } from "../firestore/board.ts"

export interface Result {
    id: string
    homeSchool: School
    awaySchool: School
    boards: Board[]
    homeScore: number
    awayScore: number
}
