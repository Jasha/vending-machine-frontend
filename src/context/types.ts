import { IUser } from 'api/types';

export interface IStore {
  user: IUser | null;
}

export type Action = { type: string; payload: IUser | null };

export type StoreContextState = [IStore, React.Dispatch<Action>];
