import { User } from "./users.ts";
import { getPlayers } from "./players.ts"


export async function getPlayersFromUser(user: User) {
    if (!user.schoolId) return []
    return getPlayers(user.schoolId)
}
