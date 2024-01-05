import googleSignInIconUrl from "../../assets/googleSignInIcon.svg"

export default function GoogleSignInButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="hover:opacity-75 active:opacity-50"
            onClick={ () => { onClick() }}
        >
            <img src={ googleSignInIconUrl } alt="Google Icon" />
        </button>
    )
}
