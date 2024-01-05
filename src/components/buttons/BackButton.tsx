import { useNavigate } from "react-router-dom"

export default function BackButton() {

    const navigate = useNavigate()

    return (
        <p
            className="pl-8 pt-8 text-accent text-xl cursor-pointer hover:opacity-75 active:opacity-50"
            onClick={ () => navigate(-1) }
        >
            { "< Back" }
        </p>
    )
}
