import { useEffect, useState } from "react"

import ListRow from "../../../components/ListRow.tsx"
import { getSchools, School } from "../../../database/schools.ts"


export default function SchoolsList() {

    const [schools, setSchools] = useState<School[]>([])

    useEffect(() => {
        getSchools()
            .then((schools) => {
                setSchools(schools)
            })
    }, [setSchools])

    return (
        <div className="space-y-5">
            {
                schools.map((school) => {
                    return (
                        <ListRow key={ school.id }>{ school.name }</ListRow>
                    )
                })
            }
        </div>
    )
}
