import { Match } from "../database/matches.ts"

import ListRow from "./ListRow.tsx"


interface MatchesListProps {
    matches: Match[]
}

export default function MatchesList({ matches }: MatchesListProps) {
    return (
        <div>
            {
                matches.length > 0 ?
                    matches.map((match) => {
                        return <ListRow key={ match.id }>{ `${match.homeSchool.name} vs. ${match.awaySchool.name} - ${match.date.split("T")[0]}` }</ListRow>
                    })
                    :
                    <p className="text-center pt-16">No matches found.</p>
            }
        </div>
    )
}
