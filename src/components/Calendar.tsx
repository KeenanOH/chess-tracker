import React, { useEffect } from "react"
import RCalendar from "react-calendar"

import "./Calendar.css"

interface CalendarProps {
    setDate: React.Dispatch<React.SetStateAction<{  display: string, value: string }>>
}

export default function Calendar({ setDate }: CalendarProps) {
    useEffect(() => {
        const currentDate = new Date()

        setDate({
            display: currentDate.toDateString(),
            value: currentDate.toString().split("T")[0]
        })
    }, [setDate]);
    
    return (
        <RCalendar
            className="rounded-xl drop-shadow-lg md:w-[550px] w-[350px] md:leading-10 leading-5 md:text-xl text-base"
            calendarType="gregory"
            minDetail="month"
            onChange={ (value) => {
                if (!value) return
                const dateValue = value as Date
                setDate({
                    display: dateValue.toDateString(),
                    value: dateValue.toString().split("T")[0]
                })
            } }
            value={ new Date() }
        />
    )
}
