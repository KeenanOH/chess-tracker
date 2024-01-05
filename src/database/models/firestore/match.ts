import { School } from "./school.ts"

export interface Match {
    id: string
    homeSchool: School
    awaySchool: School
    date: string
}

export interface SelectableMatch extends Match {
    selected: boolean
}
