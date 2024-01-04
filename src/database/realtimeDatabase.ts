import { Database, set, ref } from "firebase/database"

import { realtimeDatabaseURL } from "./firebaseConsts.ts"
import {LabeledResults} from "./models/LabeledResults.ts"
import { Board } from "./models/board.ts"
import { Match } from "./models/match.ts"

export class RealtimeDatabase {

    database: Database
    scoreMapping = {
        1: 12,
        2: 11,
        3: 10,
        4: 9,
        5: 8,
        6: 7,
        7: 6,
        8: 5
    }

    constructor(database: Database) {
        this.database = database
    }

    private scoreBoard(boards: Board[]) {
        let homeScore = 0
        let awayScore = 0
        boards.map(board => {
            if (board.result === "home")
                homeScore += this.scoreMapping[board.number]
            else if (board.result === "away")
                awayScore += this.scoreMapping[board.number]
            else if (board.result === "draw") {
                homeScore += this.scoreMapping[board.number] / 2
                awayScore += this.scoreMapping[board.number] / 2
            }
        })

        return { homeScore, awayScore }
    }

    async writeResult(label: string, match: Match, boards: Board[]) {
        const { homeScore, awayScore } = this.scoreBoard(boards)

        await set(ref(this.database, `results/${label}`), {
            homeSchool: match.homeSchool,
            awaySchool: match.awaySchool,
            boards: boards,
            homeScore: homeScore,
            awayScore: awayScore,
        })
    }

    static async getResults() {
        const response = await fetch(`${realtimeDatabaseURL}results.json`)
        const text = await response.text()
        const jsonData = JSON.parse(JSON.stringify(text))

        return jsonData as LabeledResults[]
    }

}
