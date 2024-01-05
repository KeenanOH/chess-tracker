import ConditionalRender from "../layouts/ConditionalRender.tsx"
import { EditableListRowProps } from "./types.ts"
import rightWardArrowUrl from "../../assets/right-arrow.svg"

export default function EditableListRow({ children, editing, onChange, onClick }: EditableListRowProps) {
    return (
        <div className="flex items-center cursor-pointer select-none">
            <ConditionalRender bool={ editing }>
                <input className="mr-8 scale-125 accent-primary" type="checkbox" onChange={ () => { onChange() } } />
            </ConditionalRender>

            <div
                className="flex w-full text-xl items-center py-3 shadow-lg rounded-xl transition ease-in-out hover:scale-105 active:scale-110"
                onClick={ onClick }
            >
                <span className="ml-6">{ children }</span>
                <img className="ml-auto mr-5 h-4" src={ rightWardArrowUrl } alt="link-arrow" />
            </div>
        </div>
    )
}
