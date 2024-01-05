import chessPiecesIconUrl from "../../../assets/chess-pieces-icon.png"

export default function HeroSection() {
    return (
        <div className="flex flex-col md:flex-row py-80 shadow-lg">
            <div className="md:ml-32 mx-16 font-montserrat pb-16">
                <p className="text-3xl md:text-6xl font-bold">Welcome to <span className="text-accent">Chess Tracker</span></p>
                <p className="text-xl">A place for you to <span className="text-accent">report scores</span> and <span className="text-accent">view matches</span></p>
                <div className="flex space-x-16 mt-8 items-center">
                    <a
                        className="text-xl font-bold bg-primary text-background px-8 py-4 rounded-full cursor-pointer hover:opacity-75 active:opacity-50"
                        href="#results-section"
                    >
                        Results
                    </a>
                    <a
                        className="text-xl font-bold text-primary cursor-pointer hover:opacity-75 active:opacity-50"
                        href="#info-section"
                    >
                        Getting Started
                    </a>
                </div>
            </div>
            <img className="object-none ml-auto mr-32 pb-16" src={ chessPiecesIconUrl } alt="Chess Pieces Icon"/>
        </div>
    )
}
