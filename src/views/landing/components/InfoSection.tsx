import signUpIconUrl from "../../../assets/sign-up-icon.png"
import onboardIconUrl from "../../../assets/onboard-icon.png"
import trackIconUrl from "../../../assets/track-icon.png"

export default function InfoSection() {
    return (
        <div id="info-section" className="shadow-lg pt-64 pb-64">
            <div className="font-montserrat">
                <div className="flex bg justify-center pb-16">
                    <p className="text-3xl opacity-50">Getting Started</p>
                </div>
                <div className="flex flex-col space-y-16 mx-16 bg">
                    <div className="md:flex md:flex-row md:space-x-8 justify-center">
                        <div className="rounded-xl px-12 py-20 shadow-lg">
                            <img className="h-12 w-12" src={ signUpIconUrl } alt="Sign Up Icon"/>
                            <p className="text-3xl font-bold">1. Sign Up</p>
                            <p>Create your account to start tracking!</p>
                        </div>
                        <div className="rounded-xl px-12 py-20 shadow-lg">
                            <img className="h-12 w-12" src={ onboardIconUrl } alt="Sign Up Icon"/>
                            <p className="text-3xl font-bold">2. Onboard</p>
                            <p>Simply enter your school’s access code.</p>
                        </div>
                        <div className="rounded-xl px-12 py-20 shadow-lg">
                            <img className="h-12 w-12" src={ trackIconUrl } alt="Sign Up Icon"/>
                            <p className="text-3xl font-bold">3. Track</p>
                            <p>Start tracking your school’s results!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
