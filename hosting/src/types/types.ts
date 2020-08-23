import { languages, stages } from '../utils/constants';

export type Room = {
  currentRound: Round,
  users: Users,
  state: RoomState,
  history: Round[]
}

export type Round = {
  problemURL: string
  code: string
  language: Language
  writer?: UserID
  winner?: UserID
}

export type UserID = string;

export type Users = { [id: string]: User }

export type User = {
  name: string
  point: number
  state: UserState
}

export type RoomState = 'playing' | 'waiting';

export type UserState = 'pending' | 'ready' | 'playing';

export type Language = typeof languages[number];

export type Stage = typeof stages[number];
