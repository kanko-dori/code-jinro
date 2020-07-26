export type Room = {
    currentRound: Round,
    users: User[],
    currentState: RoundState,
    history: Round[]
}

export type Round = {
    problemURL: string
    code: string
    writer?: User
    winner?: User
}

export type User = {
    userName: string
    userID: string
    point: number
}

export enum RoundState {
    問題提示,
    回答中,
    正解
}