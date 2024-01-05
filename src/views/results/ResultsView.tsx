import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { RealtimeDatabaseContext } from "../../context/RealtimeDatabaseContext.ts"
import List from "../../components/lists/List.tsx"
import { LabeledResults } from "../../database/models/realtime/labeledResults.ts"
import NavigationBar from "../../components/layouts/NavigationBar.tsx";
import BackButton from "../../components/buttons/BackButton.tsx";
import {Result} from "../../database/models/realtime/result.ts";
import ResultModal from "./components/ResultModal.tsx";


export default function ResultsView() {

    const { id } = useParams()
    const realtimeDatabase = useContext(RealtimeDatabaseContext)

    const [result, setResult] = useState<Result>()
    const [resultModalIsOpen, setResultModalIsOpen] = useState(false)
    const [labeledResults, setLabeledResults] = useState<LabeledResults>()

    useEffect(() => {
        if (!id) return

        realtimeDatabase.getResults(id)
            .then(results => setLabeledResults(results))
            .catch(error => toast.error((error as Error).message))
    }, [])

    if (!labeledResults)
        return <p className="text-3xl">Error fetching results.</p>

    return (
        <div>
            <NavigationBar />
            <BackButton />

            <List
                className="pt-16"
                title={ labeledResults.id }
                state={ [labeledResults.results, () => {}] }
                display={ result => `${result.homeSchool.name} (${result.homeScore}) vs. ${result.awaySchool.name} (${result.awayScore})` }
                onEmpty="No results to display."
                onClick={ result => {
                    setResult(result)
                    setResultModalIsOpen(true)
                } }
            />

            <ResultModal result={ result } isOpen={ resultModalIsOpen } setIsOpen={ setResultModalIsOpen } />
        </div>
    )
}
