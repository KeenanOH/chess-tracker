import React from "react"
import RCalendar from "react-calendar"

import "./Calendar.css"

interface CalendarProps {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    onChange?: (date: Date) => Promise<void>
}

export default function Calendar({ setDate, onChange }: CalendarProps) {
    return (
        <RCalendar
            className="rounded-xl drop-shadow-lg md:w-[550px] w-[350px] md:leading-10 leading-5 md:text-xl text-base"
            calendarType="gregory"
            minDetail="month"
            onClickDay={ async (date) => {
                setDate(date)
                if (onChange) await onChange(date)
            } }
        />
    )
}
