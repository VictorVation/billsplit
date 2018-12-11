import React, { useReducer, createContext } from "react";
import { Action } from "./Actions";
import reducer from "./Reducers";
import { number } from "prop-types";

export type Person = {
  shares: Array<number>;
  personTotal: number;
};

export type PeopleState = Array<Person>;

export type TotalsState = {
  subtotal: number;
  grandtotal: number;
};

export type ResultState = {
  splits: Array<number>;
  tip: number;
};

export type AppState = {
  people: PeopleState;
  totals: TotalsState;
  result: null | ResultState;
};

export const DispatchContext = React.createContext((action: Action) => {});

export const initialState: AppState = {
  people: [
    {
      shares: [0],
      personTotal: 0
    },
    {
      shares: [0],
      personTotal: 0
    }
  ],
  totals: {
    subtotal: 0,
    grandtotal: 0
  },
  result: null
};

export function DispatchContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      {props.children(state)}
    </DispatchContext.Provider>
  );
}
