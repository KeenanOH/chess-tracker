
export default function Title({ className = "", children }: { className?: string, children: string }) {
    return <p className={ "text-3xl opacity-50 " + className }>{ children }</p>
}
