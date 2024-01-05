import { Identifiable } from "../../types.ts"
import Title from "../typography/Title.tsx"
import ConditionalRender from "../layouts/ConditionalRender.tsx"
import { ListProps } from "./types.ts"
import ListRow from "./ListRow.tsx"

export default function List<T extends Identifiable>({ className = "", title, state, display, onEmpty, onClick, trailingButton }: ListProps<T>) {

    const [data] = state

    function handleClick(data: T) {
        if (onClick)
            onClick(data)
    }

    return (
        <div className={ "w-full " + className }>
            <div className="mx-16 2xl:mx-96">
                <Title>{ title }</Title>

                <ConditionalRender bool={ data.length > 0} onFalse={ <p className="text-center py-16">{ onEmpty }</p> }>
                    <div className="space-y-5">
                        {
                            data.map(data => {
                                return (
                                    <ListRow
                                        key={ data.id }
                                        onClick={ () => { handleClick(data) } }
                                    >
                                        { display(data) }
                                    </ListRow>
                                )
                            })
                        }
                    </div>
                </ConditionalRender>

                <ConditionalRender bool={ !!trailingButton }>
                    <div className={ "flex justify-center pt-4 " + (data.length > 0 ? "md:justify-end" : "") }>
                        <div className="w-48">
                            { trailingButton }
                        </div>
                    </div>
                </ConditionalRender>
            </div>
        </div>
    )
}
