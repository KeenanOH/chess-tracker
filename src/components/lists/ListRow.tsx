import rightWardArrowUrl from "../../assets/right-arrow.svg"
import { ListRowProps } from "./types.ts"

export default function ListRow({ children, onClick }: ListRowProps) {
    return (
        <div className="flex cursor-pointer select-none" onClick={ onClick }>
            <div className="flex w-full text-xl py-3 shadow-lg rounded-xl transition ease-in-out hover:scale-105 active:scale-110">
                <p className="ml-6">{children}</p>
                <img className="ml-auto mr-5" src={ rightWardArrowUrl } alt="link-arrow" />
            </div>
        </div>
    )
}
