import googleSignInIconUrl from "../assets/googleSignInIcon.svg"

export default function GoogleSignInButton() {
    return (
        <button className="hover:opacity-75 active:opacity-50">
            <img src={ googleSignInIconUrl } alt="Google Icon" />
        </button>
    )
}
