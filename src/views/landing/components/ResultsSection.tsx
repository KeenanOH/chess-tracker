import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

import List from "../../../components/lists/List.tsx"
import { RealtimeDatabaseContext } from "../../../context/RealtimeDatabaseContext.ts"
import { Label } from "../../../database/models/realtime/label.ts"

export default function ResultsSection() {

    const realtimeDatabase = useContext(RealtimeDatabaseContext)
    const navigate = useNavigate()

    const [resultLabels, setResultLabels] = useState<Label[]>([])

    useEffect(() => {

        realtimeDatabase.getLabels()
            .then(labels => setResultLabels(labels))
            .catch(error => toast.error((error as Error).message))
    }, [])

    return (
        <div id="results-section" className="shadow-lg py-64">
            <List
                title="Results"
                state={ [resultLabels, () => {}] }
                display={ result => result.name }
                onEmpty="No results to display."
                onClick={ result => navigate(`/results/${result.id}`) }
            />
        </div>
    )
}
