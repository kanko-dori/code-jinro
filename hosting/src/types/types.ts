import { languages } from '../utils/constants';

export type Room = {
  currentRound: Round,
  users: User[],
  currentState: RoundState,
  history: Round[]
}

export type Round = {
  problemURL: string
  code: string
  language: string
  writer?: User
  winner?: User
}

export type User = {
  name: string
  id: string
  point: number
}

export enum RoundState {
  問題提示,
  回答中,
  正解
}

export type Language = typeof languages[number];
