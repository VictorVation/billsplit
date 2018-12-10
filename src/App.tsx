import React from "react";
import { AppState, DispatchContextProvider } from "./State";
import PeopleView from "./Views/PeopleView";
import TotalsView from "./Views/TotalsView";
import ResultView from "./Views/ResultView";
import "./App.css";

export default function App() {
  return (
    <DispatchContextProvider>
      {(state: AppState) => (
        <div className="container center">
          <h1>billsplit</h1>
          <PeopleView people={state.people} />
          <hr />
          <TotalsView {...state.totals} />
          <hr />
          <ResultView />
        </div>
      )}
    </DispatchContextProvider>
  );
}
