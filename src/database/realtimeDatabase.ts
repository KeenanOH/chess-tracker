import { Database, push, ref, get } from "firebase/database"

// import { realtimeDatabaseURL } from "./firebaseConsts.ts"
import { Board } from "./models/firestore/board.ts"
import { Match } from "./models/firestore/match.ts"
// import { Result } from "./models/realtime/result.ts"
import { Label } from "./models/realtime/label.ts"
import { Result } from "./models/realtime/result.ts"
import {LabeledResults} from "./models/realtime/labeledResults.ts";
import {School} from "./models/firestore/school.ts";
// import {School} from "./models/firestore/school.ts";

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

    async createLabel(name: string): Promise<Label> {
        const labelReference = await push(ref(this.database, "results"), { name })
        return { id: labelReference.key!, name }
    }

    async getLabels() {
        const snapshot = await get(ref(this.database, "results"))
        const labels: Label[] = []

        snapshot.forEach(child => {
            const jsonData = child.toJSON() as { name: string }
            labels.push({ id: child.key, name: jsonData.name })
        })

        return labels
    }

    private scoreBoards(boards: Board[]) {
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

    async createResult(resultsId: string, match: Match, boards: Board[]) {
        const { homeScore, awayScore } = this.scoreBoards(boards)

        await push(ref(this.database, `results/${resultsId}`), {
            homeSchool: match.homeSchool,
            awaySchool: match.awaySchool,
            boards: boards,
            homeScore: homeScore,
            awayScore: awayScore,
        })
    }

    async getResults(resultsId: string): Promise<LabeledResults> {
        const snapshot = await get(ref(this.database, `results/${resultsId}`))
        const results: Result[] = []
        let name = ""

        snapshot.forEach(child => {
            if (child.key != "name") {
                const jsonData = child.toJSON()
                const result = jsonData as { id: string, homeSchool: School, awaySchool: School, homeScore: number, awayScore: number, boards: { [key: string]: Board } }
                const boards: Board[] = []

                for (const board in result.boards) {
                    boards.push(result.boards[board] as Board)
                }

                results.push({
                    id: result.id,
                    homeSchool: result.homeSchool,
                    awaySchool: result.awaySchool,
                    homeScore: result.homeScore,
                    awayScore: result.awayScore,
                    boards
                })
            } else {
                name = child.val()
            }
        })

        return { id: name, results: results }
    }
    // static async getResults() {
    //     const response = await fetch(`${realtimeDatabaseURL}results.json`)
    //     const text = await response.text()
    //     const jsonData = JSON.parse(text)
    //     console.log(typeof jsonData)
    //     return jsonData as LabeledResults[]
    //
    // }

}
