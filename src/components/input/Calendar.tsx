import React from "react"
import RCalendar from "react-calendar"

import "./Calendar.css"

interface CalendarProps {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    onChange?: (date: Date) => void
}

export default function Calendar({ setDate, onChange }: CalendarProps) {
    return (
        <RCalendar
            className="rounded-xl drop-shadow-lg md:w-[550px] w-[350px] md:leading-10 leading-5 md:text-xl text-base"
            calendarType="gregory"
            minDetail="month"
            onClickDay={ date => {
                setDate(date)

                if (onChange)
                    onChange(date)
            } }
        />
    )
}
