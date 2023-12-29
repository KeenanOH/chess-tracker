import { useState } from "react"

import NavigationBar from "../../components/NavigationBar.tsx"
import ListRow from "../../components/ListRow.tsx"
import Button from "../../components/Button.tsx"
import Footer from "../../components/Footer.tsx"
import Calendar from "../../components/Calendar.tsx"
import SchoolsList from "./components/SchoolsList.tsx"


export default function AdminView() {

    const [date, setDate] = useState("")

    return (
        <div>
            <NavigationBar isAdmin={ true } />
            <div className="flex flex-col items-center pt-8">
                <div className="flex flex-col py-16">
                    <Calendar setDate={ setDate } />
                </div>

                <div className="w-full">
                    <div className="mx-16 2xl:mx-96">
                        <p className="text-3xl opacity-50 pb-5">{ date }</p>
                        <div className="space-y-5">
                            <ListRow>Test</ListRow>
                            <ListRow>Test</ListRow>
                            <ListRow>Test</ListRow>
                        </div>
                        <div className="flex justify-center md:justify-end pt-4">
                            <div className="w-48">
                                <Button onClick={ () => { } }>Add Match</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full pt-32">
                    <div className="mx-16 2xl:mx-96">
                        <p className="text-3xl opacity-50 pb-5">Schools</p>
                        <SchoolsList />
                        <div className="flex justify-center md:justify-end pt-4">
                            <div className="w-48">
                                <Button onClick={ () => { } }>Add School</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
