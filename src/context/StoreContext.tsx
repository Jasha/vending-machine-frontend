import React from 'react';
import { useImmerReducer } from 'use-immer';

import ACTION_TYPES from './constants';
import { IStore, StoreContextState, Action } from './types';

const INITIAL_STATE: IStore = {
  user: null,
};

const StoreContext = React.createContext<StoreContextState>([
  INITIAL_STATE,
  () => null,
]);

const reducer = (draft: IStore, action: Action): void => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      draft.user = action.payload;
      break;
    default:
      console.warn(`Unhandled action ${JSON.stringify(action)}`);
      break;
  }
};

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FunctionComponent<StoreProviderProps> = ({
  children,
}: StoreProviderProps) => {
  const [state, dispatch] = useImmerReducer(reducer, INITIAL_STATE);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextState {
  const context = React.useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
}

// export const { Consumer } = StoreContext;
