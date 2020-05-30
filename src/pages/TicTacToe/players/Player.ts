import { State } from '../game.js';

export type Play = (
  state: State,
  name: string,
  row: number,
  col: number
) => State;

export interface Player {
  name: string;
  play: Play;
  notify: (state: State) => State;
  hint: (state: State, ...hints: number[]) => State;
}
